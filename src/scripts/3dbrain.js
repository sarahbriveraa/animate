/* TODO: Find a way to search for a mesh in a scene by the name on the mesh to use to connect the nav buttons to highlight the mesh*/
//scene.getObjectByName( "objectName" );
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';

//Global Variables
var brainCanvas, controls, camera, scene, light, renderer, lastClickedElement, brainNav, lastMouseoverElement, mouse = {
  x: 0,
  y: 0
};

brainCanvas = document.querySelector(".brain-canvas");
brainNav = document.querySelector("#brain-nav");

const hoverColor = [.8, .2, .8]
const selectedColor = [.8, .1, .3]
const initialColor = [.9, .6, .525]

if (brainCanvas) {
  renderer = init();
}

function init() {
  //renderer

  var renderer = new THREE.WebGLRenderer({
    canvas: brainCanvas,
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
  controls = new OrbitControls(camera, brainCanvas);
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
  brainCanvas.addEventListener('mousemove', onDocumentMouseMove, false);

  //click reveal
  brainNav.addEventListener('click', onBrainNavClick, false);
  brainCanvas.addEventListener('click', onBrainCanvasClick, false);

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
      setColor(lastMouseoverElement, selectedColor);
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
      setColor(mouseoverElement, hoverColor);
    }

    //Saving the last mouseover element to reference later
    return lastMouseoverElement = mouseoverElement;
  }
}

function onBrainCanvasClick(e) {
  console.log("onBrainCanvasClick", e);
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
      hideLastClicked(lastClickedElement);

    //Showing the current clicked elements info
    brainInfoToggle(clickedElement, selectedColor)
    console.log("lastClickedElement Canvas", lastClickedElement);
    //saving the last clicked element to reference later
    return lastClickedElement = clickedElement;

  } else {
    //reseting the last clicked element if you click outside of the model
    hideLastClicked(lastClickedElement);
  }
}

function onBrainNavClick(e) {
  const tempstring = '{"name": "' + e.target.className +'" , "clicked":true, }';
  clickedElement = JSON.parse(tempstring);

  ///TODO LAST TOUCHED LINES
  brainInfoToggle(clickedElement);
  hideLastClicked(clickedElement);

}

function hideLastClicked(e) {
  if (e) {
  console.log("hideLastClicked", e);
  if (e.type === "Mesh") {
    console.log("it's a mesh!", e);
    var lastClickedElementClass = '.info-' + e.name;
    document.querySelector(lastClickedElementClass).classList.remove('show-me');
    document.querySelector(lastClickedElementClass).classList.add('hide-me');
      setColor(e, initialColor);
  } else {
    console.log("it's NOT a mesh!", e);
  }
}
}

function brainInfoToggle(e, selectedColor) {

  switch (e.name || e.target.className) {
    case "temporal":
      setColor(e, selectedColor);
      document.querySelector(".info-temporal").classList.remove('hide-me');
      document.querySelector(".info-temporal").classList.add('show-me');
      break;

    case "frontal":
      setColor(e, selectedColor);
      document.querySelector(".info-frontal").classList.remove('hide-me');
      document.querySelector(".info-frontal").classList.add('show-me');
      break;

    case "occipital":
      setColor(e, selectedColor);
      document.querySelector(".info-occipital").classList.remove('hide-me');
      document.querySelector(".info-occipital").classList.add('show-me');
      break;

    case "parietal":
      setColor(e, selectedColor);
      document.querySelector(".info-parietal").classList.remove('hide-me');
      document.querySelector(".info-parietal").classList.add('show-me');
      break;

    case "cerebellum":
      setColor(e, selectedColor);
      document.querySelector(".info-cerebellum").classList.remove('hide-me');
      document.querySelector(".info-cerebellum").classList.add('show-me');
      break;

    case "brainstem":
      setColor(e, selectedColor);
      document.querySelector(".info-brainstem").classList.remove('hide-me');
      document.querySelector(".info-brainstem").classList.add('show-me');
      break;

    default:
      console.log("You clicked on the brain, but there isn't any info for that region.");

  }
}

//Used for highlighting a section of the mesh
function setColor(mesh, color) {
  if (color != undefined)
    mesh.material.color = {
      r: color[0],
      g: color[1],
      b: color[2]
    };
}

//Resizing the rendered area based on the size of the brainCanvas 
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