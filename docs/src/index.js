import _ from 'lodash';
import Chart from 'chart.js';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';
import './scripts/stickyheader.js';
import './scripts/codechart.js';
import './styles/main.scss';
import './pages/fun.html';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols';
import TrackballControls from 'three-trackballcontrols';
import WEBGL from './scripts/webgl';

fontawesome.library.add(regular)
fontawesome.library.add(solid)
fontawesome.library.add(brands)


var container, controls;
var camera, scene, light;
container = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: container,
    antialias: true
});

//camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(-1.8, 0.9, 10);

//controls
controls = new OrbitControls(camera, container);
//controls = new TrackballControls( camera , container);
controls.target.set(0, -0.2, -0.2);
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

// model
var loader = new GLTFLoader();
loader.load('assets/models/untitled.gltf', function (gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material.envMap = envMap;
        }
    });
    scene.add(gltf.scene);
}, undefined, function (e) {
    console.error(e);
});

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // set render target sizes here
    }
}

function animate(time) {
    time *= 0.001; // seconds

    resizeCanvasToDisplaySize();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);