import _ from 'lodash';
import "./styles/main.scss";
import Chart from 'chart.js';
import './scripts/sample-data';


import ChartDataLabels from 'chartjs-plugin-datalabels';

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBrain, faInfoCircle, faTree, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faFileCode, faAddressCard, faLightbulb} from '@fortawesome/free-regular-svg-icons';

library.add(faBrain, faPaperPlane, faFileCode, faAddressCard, faLightbulb, faTree, faInfoCircle, faChartLine);

dom.watch();


import './scripts/stickyheader';
import './scripts/chart-bar';
import './scripts/chart-doughnut';
import './scripts/chart-line';
import './scripts/3dbrain';

import './scripts/stickyheader';
