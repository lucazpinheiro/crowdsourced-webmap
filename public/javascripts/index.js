const initialCordinates = [-27.59, -48.54]; // Cordenadas de Florianópolis
const initialZoom = 12;

const map = L.map('map').setView(initialCordinates, initialZoom);

const baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
});

baseLayer.addTo(map);

async function getData(callback) {
  const response = await fetch('/mapData');
  const geoData = await response.json();
  callback(geoData);
}

getData((a) => {
  L.geoJSON(a.data, {

    onEachFeature: (feature, layer) => {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    },

  }).addTo(map);
});

const obj = {
  content: '',
  layer: {},
};

// const featureObj = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [
//       -48.55356216430663,
//       -27.594109168464303
//     ]
//   }
// }

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: false,
    rectangle: false,
    marker: true,
    circlemarker: false,
  },
  edit: {
    featureGroup: drawnItems,
  },
});
map.addControl(drawControl);


map.on(L.Draw.Event.CREATED, (e) => {
  const { layer, layerType } = e;

  if (layerType === 'polygon') {
    obj.layer = {
      type: layerType,
      coords: layer._latlngs.flat(),
    };
  } else {
    obj.layer = {
      type: layerType,
      coords: layer._latlng,
    };
  }
  console.log(obj);
  // Do whatever else you need to. (save to db; add to map etc)
  map.addLayer(layer);
});

// map.on('draw:edited', (e) => {
//   const { layers } = e;
//   layers.eachLayer((layer) => {
//     console.log(layer);
//     obj.feature = layer;
//     //do whatever you want; most likely save back to db
//   });
// });


async function send() {
  // const info = document.getElementById('info').value;
  obj.content = document.getElementById('info').value;
  console.log(obj);
  const response = await fetch('/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
}
