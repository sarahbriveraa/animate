import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';


var container, controls;
container = document.querySelector(".mycanvas");

if (container) {
  var camera, scene, light, mouse = {
      x: 0,
      y: 0
    },
    lastclickedElement,lastMouseoverElement;
  container = document.querySelector(".mycanvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true,
    alpha: true
  });
  renderer.shadowMapType = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  //collider - testing for if a click or mouseover collided with something
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
        console.log(child.material);
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

  //interactive elements
  renderer.domElement.addEventListener('mouseover', function (event) {
    console.log(event);
    console.log("mouseover");
    if (lastMouseoverElement && lastMouseoverElement.initialColor) {
      lastMouseoverElement.material.color = lastMouseoverElement.initialColor;
    }
    
    var mintersects = collider(renderer);
    if (mintersects.length) {
      var mouseoverElement = mintersects[0].object;

      setColor(mouseoverElement);
      //Saving the last mouseover element to reference later
      return lastMouseoverElement = mouseoverElement;
    }
  }, false);


  

  renderer.domElement.addEventListener('mousedown', function (event) {
    console.log("lastclickedElement", lastclickedElement);

    if (lastclickedElement && lastclickedElement.initialColor) {
      lastclickedElement.material.color = lastclickedElement.initialColor;
    }

    var intersects = collider(renderer);
    if (intersects.length) {
      var clickedElement = intersects[0].object;

      //Hiding the last clicked element
      if (lastclickedElement) {
        var lastclickedElementClass = '.info-' + lastclickedElement.name;
        document.querySelector(lastclickedElementClass).classList.remove('show-me');
        document.querySelector(lastclickedElementClass).classList.add('hide-me');
      }

      //Showing the current clicked element
      switch (clickedElement.name) {
        case "temporal":
          setColor(clickedElement);

          document.querySelector(".info-temporal").classList.remove('hide-me');
          document.querySelector(".info-temporal").classList.add('show-me');
          break;

        case "frontal":
          setColor(clickedElement);
          document.querySelector(".info-frontal").classList.remove('hide-me');
          document.querySelector(".info-frontal").classList.add('show-me');
          break;

        case "occipital":
          setColor(clickedElement);
          document.querySelector(".info-occipital").classList.remove('hide-me');
          document.querySelector(".info-occipital").classList.add('show-me');
          break;

        case "parietal":
          setColor(clickedElement);
          document.querySelector(".info-parietal").classList.remove('hide-me');
          document.querySelector(".info-parietal").classList.add('show-me');
          break;

        case "cerebellum":
          setColor(clickedElement);
          document.querySelector(".info-cerebellum").classList.remove('hide-me');
          document.querySelector(".info-cerebellum").classList.add('show-me');
          break;

        case "brainstem":
          setColor(clickedElement);
          document.querySelector(".info-brainstem").classList.remove('hide-me');
          document.querySelector(".info-brainstem").classList.add('show-me');
          break;

        default:
          console.log("You clicked on the brain, but there isn't a case setup for that region.");

      }

      //Saving the last clicked element to reference later
      return lastclickedElement = clickedElement;
    } else {
      if (lastclickedElement) {
        var lastclickedElementClass = '.info-' + lastclickedElement.name;
        document.querySelector(lastclickedElementClass).classList.remove('show-me');
        document.querySelector(lastclickedElementClass).classList.add('hide-me');
        if (lastclickedElement && lastclickedElement.initialColor) {
          lastclickedElement.material.color = lastclickedElement.initialColor;
        }
      }
    }
  }, false);

  //Used for highlighting a section of the mesh when it's clicked
  function setColor(mesh) {
    mesh.initialColor = mesh.material.color;
    mesh.material.color = {
      r: .8,
      g: .1,
      b: .3
    };
  }

  function resizeCanvasToDisplaySize() {
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

  function animate(time) {
    time *= 0.001; // seconds

    resizeCanvasToDisplaySize();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}