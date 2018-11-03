import _ from 'lodash';
import Chart from 'chart.js';
import './scripts/stickyheader.js';
import './scripts/codechart.js';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';
import './styles/main.scss';
import './pages/fun.html';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
 
const loader = new GLTFLoader();

fontawesome.library.add(regular)
fontawesome.library.add(solid)
fontawesome.library.add(brands)
