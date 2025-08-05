import {Map, MapView} from './arcgis-modules.js'
const map = new Map({
  basemap: "topo-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [78.4867, 17.3850], // Hyderabad
  // zoom: 10
});

export {map, view};
