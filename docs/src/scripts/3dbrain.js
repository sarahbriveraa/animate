import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';
import TrackballControls from 'three-trackballcontrols';
import WEBGL from './webgl';
//import { Interaction } from 'three.interaction';

var container, controls;
var camera, scene, light,mouse = {
  x: 0,
  y: 0
};
container = document.querySelector(".mycanvas");
const renderer = new THREE.WebGLRenderer({
  canvas: container,
  antialias: true,
  alpha: true
});


//camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(-1.8, 0.9, 10);

//controls
controls = new OrbitControls(camera, container);
//controls = new TrackballControls( camera , container);
controls.target.set(0, .2, -0.2);
controls.minDistance = 5;
controls.maxDistance = 20;

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
scene.background = envMap;
light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
light.position.set(0, 1, 0);
scene.add(light);

//const interaction = new Interaction(renderer, scene, camera);

// model
var loader = new GLTFLoader();
loader.load('assets/models/brain1.gltf', function (brain) {
  brain.scene.traverse(function (child) {
    if (child.isMesh) {
      child.material.envMap = envMap;
    }
  });
  console.log("during brain", brain);
  scene.add(brain.scene);
  var object = brain.scene.getObjectByName( 'frontal', true ) //this is finding it
  console.log("object", object);
}, undefined, function (e) {
  console.error(e);
});
console.log("scene", scene);

//setting the background to transparent
renderer.setClearColor(0x000000, 0);
scene.background = null;
renderer.gammaInput = true;
renderer.gammaOutput = true;


//interactive elements

renderer.domElement.addEventListener('mousedown', function(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);

  vector.unproject(camera);

  var raycaster = new THREE.Raycaster(
      camera.position,
      vector.sub(camera.position).normalize()
  );
  var intersects = raycaster.intersectObjects(scene.children, true);
  console.log("intersects", intersects);
  console.log("intersects[0]", intersects[0]);
  if (intersects.length) {
    console.log("You clicked something!");
    if (intersects[0].object.name == "temporal") {
      console.log("Temporal Clicked");
    }

  }
}, false);

//


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