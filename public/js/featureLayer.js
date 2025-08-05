import { FeatureLayer } from "./arcgis-modules.js";
import {map,view} from './mapview.js';

const featureLayer = new FeatureLayer({
    url:'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Art_Galleries_NewYork/FeatureServer/0',
    title:'NewYork Art gallaries'
});

view.center = [40.7128,-74.0060];
map.add(featureLayer);

