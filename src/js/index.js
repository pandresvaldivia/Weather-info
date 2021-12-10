import '../css/global.css';
import '../css/current-weather.css';
import '../css/weekly-weather.css';
import '../css/tabs.css';
import '../css/day-weather.css';
import '../css/loading.css';
import '../css/index.css';

import { currentWeather } from './current-wheather.js';
import { $app, $loader } from './selectors.js';
import Viewport from './utils/viewport.js';

const viewport = new Viewport();

viewport.viewportSize($app);
viewport.viewportSize($loader);

currentWeather();
