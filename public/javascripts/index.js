const initialCordinates = [-27.59, -48.54]; // Cordenadas de Florianópolis
const initialZoom = 12;

const map = L.map('map').setView(initialCordinates, initialZoom);

const baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
});

baseLayer.addTo(map);

async function getData(callback) {
  try {
    const response = await fetch('/mapData');
    const geoData = await response.json();
    callback(geoData);
  } catch (err) {
    console.error(err);
  }
}


function getCurrentDate() {
  const date = new Date();
  const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth()}` : date.getMonth();
  return `${date.getFullYear()}-${month}-${day}`;
}

getData((geoData) => {
  L.geoJSON(geoData, {

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
  obj.content = {
    // date: getCurrentDate(),
    info: document.getElementById('info').value,
  };
  console.log('obj');
  console.log(obj);
  try {
    const response = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}
