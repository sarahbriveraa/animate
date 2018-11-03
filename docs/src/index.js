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
import WEBGL from './scripts/webgl';
 
fontawesome.library.add(regular)
fontawesome.library.add(solid)
fontawesome.library.add(brands)

//const loader = new GLTFLoader();

/*
var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));

var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 10, 10, 10 );
scene.add( light );
//camera.position.z = 10;

// Load a glTF resource
loader.load(
	// resource URL
	'assets/models/duck.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);*/

/* if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
} */
var container, controls;
var camera, scene, renderer, light;
init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 1.8, 0.9, 10 );
    controls = new OrbitControls( camera );
    controls.target.set( 0, - 0.2, - 0.2 );
    controls.update();
    // envmap
    var path = 'assets/textures/Bridge2/';
    var format = '.jpg';
    var envMap = new THREE.CubeTextureLoader().load( [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ] );
    scene = new THREE.Scene();
    scene.background = envMap;
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
    light.position.set( 0, 1, 0 );
    scene.add( light );
    // model
    var loader = new GLTFLoader();
    loader.load( 'assets/models/untitled.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.envMap = envMap;
            }
        } );
        scene.add( gltf.scene );
    }, undefined, function ( e ) {
        console.error( e );
    } );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    renderer.setClearColor (0xff0000, 1);
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}