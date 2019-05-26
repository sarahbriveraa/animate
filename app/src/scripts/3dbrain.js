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
  lastclickedElement;
container = document.querySelector(".mycanvas");
const renderer = new THREE.WebGLRenderer({
  canvas: container,
  antialias: true,
  alpha: true
});
renderer.gammaInput = true;
renderer.gammaOutput = true;


//camera
camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .25, 20);
camera.position.set(-1.8, -2, 12);


//controls
controls = new OrbitControls(camera, container);
//controls = new TrackballControls( camera , container);
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
//scene.background = envMap;
light = new THREE.HemisphereLight(0xD7D1C1, 0x440035);
light.position.set(0, 1, 0);
var light2 = new THREE.DirectionalLight(0xffffff, 1, 100);
light2.position.set(0, 1, 0); //default; light shining from top
light2.castShadow = false;
scene.add(light, light2);

// model
var loader = new GLTFLoader();
loader.load('assets/models/brain2.gltf', function (brain) {
  brain.scene.traverse(function (child) {
    if (child.isMesh) {
      console.log(child.material);
      /*        child.material = new THREE.MeshStandardMaterial( {
              color: 0xE69A86,
              metalness: 1,
              roughness: .2,
              envMap: envMap
            }); */
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

renderer.domElement.addEventListener('mousedown', function (event) {
  console.log("lastclickedElement", lastclickedElement);
  if (lastclickedElement && lastclickedElement.initialColor) {
    lastclickedElement.material.color = lastclickedElement.initialColor;
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);

  vector.unproject(camera);

  var raycaster = new THREE.Raycaster(
    camera.position,
    vector.sub(camera.position).normalize()
  );
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length) {

    var clickedElement = intersects[0].object;
    if (clickedElement.name == "temporal") {
      //clickedElement.material.color = {r:100, g:0, b:0};
      setColor(clickedElement);
      document.querySelector(".info").classList.remove('hideMe');
      document.querySelector(".info").classList.add('showMe');
    }
    return lastclickedElement = clickedElement;
  }
}, false);

//
function setColor(mesh) {
  mesh.initialColor = mesh.material.color;
  mesh.material.color = {
    r: 100,
    g: 0,
    b: 0
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