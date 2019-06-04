import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';

//Global Variables
var container, controls, camera, scene, light, renderer, lastClickedElement, lastMouseoverElement, mouse = {
  x: 0,
  y: 0
};
container = document.querySelector(".brain3d");

const hover = [.8, .2, .8]
const selected = [.8, .1, .3]
const initialColor = [.9, .6, .525]

if (container) {
  renderer = init();
}


function init() {
  //renderer
 
  var renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: true
  });
  renderer.shadowMapType = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  //camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .25, 20);
  camera.position.set(-1.8, -2, 12);


  //controls
  controls = new OrbitControls(camera, container);
  controls.target.set(0, .2, -0.2);
  controls.minDistance = 5;
  controls.maxDistance = 18;

  controls.update();

  // envmap
  var path = 'assets/textures/Bridge2/';
  var format = '.jpg';
  var envMap = new THREE.CubeTextureLoader().load([
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
  ]);

  //scene/lights
  scene = new THREE.Scene();
  light = new THREE.HemisphereLight(0xD7D1C1, 0x440035);
  light.position.set(0, 1, 0);
  var light2 = new THREE.DirectionalLight(0xffffff, .5, 100);
  light2.position.set(0, 1, 0); //default; light shining from top
  light2.castShadow = false;
  scene.add(light, light2);

  light2.shadowMapWidth = 1024; // default is 512
  light2.shadowMapHeight = 1024; // default is 512

  // model
  var loader = new GLTFLoader();
  loader.load('assets/models/brain4.gltf', function (brain) {
    brain.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshPhongMaterial({
          color: 0xE69A86,
          specular: 0xFFFFFF,
          reflectivity: .1,
          shininess: 100,
          envMap: envMap
        });

      }
    });
    scene.add(brain.scene);
  }, undefined, function (e) {
    console.error(e);
  });

  //setting the background to transparent
  renderer.setClearColor(0x000000, 0);
  scene.background = null;

  // Hover highlight
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  //Selected hightlight
  document.addEventListener('click', onDocumentClick, false);

  return renderer;
}


//collider - testing if the mouse has interacted with something in 3D space
function collider(renderer) {
  mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
  mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);

  vector.unproject(camera);

  var raycaster = new THREE.Raycaster(
    camera.position,
    vector.sub(camera.position).normalize()
  );
  var intersects = raycaster.intersectObjects(scene.children, true);

  return intersects;

};

//Events
function onDocumentMouseMove() {
  //Reseting the last mouse over state
  if (lastMouseoverElement) {
    if (lastMouseoverElement.clicked == true) {
      setColor(lastMouseoverElement, selected);
    } else {
      setColor(lastMouseoverElement, initialColor);
    }
  }
  //Finding the clicked elements
  var mintersects = collider(renderer);

  if (mintersects.length) {
    //Saving the hovered element
    var mouseoverElement = mintersects[0].object;

    //Setting the hover color if it's not already clicked
    if (mouseoverElement.clicked != true) {
      setColor(mouseoverElement, hover);
    }

    //Saving the last mouseover element to reference later
    return lastMouseoverElement = mouseoverElement;
  }
}

function onDocumentClick(e) {
  if (e.target.type === "submit") {
    switch (e.target.className) {
      case "temporal":
        
        document.querySelector(".info-temporal").classList.remove('hide-me');
        document.querySelector(".info-temporal").classList.add('show-me');
        break;

      case "frontal":
        
        document.querySelector(".info-frontal").classList.remove('hide-me');
        document.querySelector(".info-frontal").classList.add('show-me');
        break;

      case "occipital":
        
        document.querySelector(".info-occipital").classList.remove('hide-me');
        document.querySelector(".info-occipital").classList.add('show-me');
        break;

      case "parietal":
        
        document.querySelector(".info-parietal").classList.remove('hide-me');
        document.querySelector(".info-parietal").classList.add('show-me');
        break;

      case "cerebellum":
        
        document.querySelector(".info-cerebellum").classList.remove('hide-me');
        document.querySelector(".info-cerebellum").classList.add('show-me');
        break;

      case "brainstem":
        
        document.querySelector(".info-brainstem").classList.remove('hide-me');
        document.querySelector(".info-brainstem").classList.add('show-me');
        break;

      default:
        console.log("You clicked on the brain, but there isn't any info for that region.");

    }

    return;
  } else {
    //Reseting the last clicked element
    if (lastClickedElement) {
      lastClickedElement.clicked = false;
      setColor(lastClickedElement, initialColor);
    }

    //Finding the clicked elements
    var intersects = collider(renderer);

    if (intersects.length) {
      //Saving the clicked element
      var clickedElement = intersects[0].object;

      //Seting a clicked attribute to reference later
      clickedElement.clicked = true;

      //Hiding the last clicked elements info
      if (lastClickedElement) {
        var lastClickedElementClass = '.info-' + lastClickedElement.name;
        document.querySelector(lastClickedElementClass).classList.remove('show-me');
        document.querySelector(lastClickedElementClass).classList.add('hide-me');
      }

      //Showing the current clicked elements info
      switch (clickedElement.name) {
        case "temporal":
          setColor(clickedElement, selected);
          document.querySelector(".info-temporal").classList.remove('hide-me');
          document.querySelector(".info-temporal").classList.add('show-me');
          break;

        case "frontal":
          setColor(clickedElement, selected);
          document.querySelector(".info-frontal").classList.remove('hide-me');
          document.querySelector(".info-frontal").classList.add('show-me');
          break;

        case "occipital":
          setColor(clickedElement, selected);
          document.querySelector(".info-occipital").classList.remove('hide-me');
          document.querySelector(".info-occipital").classList.add('show-me');
          break;

        case "parietal":
          setColor(clickedElement, selected);
          document.querySelector(".info-parietal").classList.remove('hide-me');
          document.querySelector(".info-parietal").classList.add('show-me');
          break;

        case "cerebellum":
          setColor(clickedElement, selected);
          document.querySelector(".info-cerebellum").classList.remove('hide-me');
          document.querySelector(".info-cerebellum").classList.add('show-me');
          break;

        case "brainstem":
          setColor(clickedElement, selected);
          document.querySelector(".info-brainstem").classList.remove('hide-me');
          document.querySelector(".info-brainstem").classList.add('show-me');
          break;

        default:
          console.log("You clicked on the brain, but there isn't any info for that region.");

      }

      //Saving the last clicked element to reference later
      return lastClickedElement = clickedElement;
    } else {
      //reseting the last clicked element if you click outside of the model
      if (lastClickedElement) {
        var lastClickedElementClass = '.info-' + lastClickedElement.name;
        document.querySelector(lastClickedElementClass).classList.remove('show-me');
        document.querySelector(lastClickedElementClass).classList.add('hide-me');
        if (lastClickedElement) {
          setColor(lastClickedElement, initialColor);
        }
      }
    }
  }
}

//Used for highlighting a section of the mesh
function setColor(mesh, color) {
  mesh.material.color = {
    r: color[0],
    g: color[1],
    b: color[2]
  };
}

//Resizing the rendered area based on the size of the container 
function resizeCanvasToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js will fight the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

//Rendering loop
function animate(time) {
  time *= 0.001; // seconds

  resizeCanvasToDisplaySize(renderer);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);