const obj = {};
const initialCordinates = [-27.59, -48.54]; // Cordenadas de Florianópolis
const initialZoom = 12;

const map = L.map('map').setView(initialCordinates, initialZoom);

const baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// const geojson = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [
//       -48.51390838623047,
//       -27.59745608962857
//     ]
//   }
// };

// L.geoJSON(geojson).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: true,
    rectangle: false,
    marker: true,
    circlemarker: false,
  },
  edit: {
    featureGroup: drawnItems,
  },
});
map.addControl(drawControl);

async function saveObj() {
  const obj = {
    campo1: 'tá indo, devagar mas tá indo',
    campo2: [-27.587530, -48.556715],
  };

  const response = await fetch('./post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  console.log(response);

}

map.on(L.Draw.Event.CREATED, (e) => {
  const { layer } = e;
  console.log(layer);

  // Do whatever else you need to. (save to db; add to map etc)
  map.addLayer(layer);
});

map.on('draw:edited', (e) => {
  const layers = e.layers;
  layers.eachLayer((layer) => {
    console.log(layer);
    //do whatever you want; most likely save back to db
  });
});


// const editableLayers = new L.FeatureGroup();
// map.addLayer(editableLayers);

// const featureGroup = L.featureGroup().addTo(map);
