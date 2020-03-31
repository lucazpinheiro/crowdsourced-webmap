const initialCordinates = [-27.59, -48.54]; // Cordenadas de Florianópolis
const initialZoom = 12;

const map = L.map('map').setView(initialCordinates, initialZoom);

const baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
});

const obj = {};

const submittCondition = {
  feature: false,
  content: false,
};

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


getData((geoData) => {
  L.geoJSON(geoData, {

    onEachFeature: (feature, layer) => {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    },

  }).addTo(map);
});


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


map.on(L.Draw.Event.CREATED, (event) => {
  const { layer, layerType } = event;

  if (layerType === 'polygon') {
    obj.type = layerType;
    obj.coords = layer._latlngs.flat();
  } else {
    obj.type = layerType;
    obj.coords = layer._latlng;
  }

  submittCondition.feature = true;
  console.log(submittCondition);
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


function getInput() {
  obj.info = document.getElementById('info').value;
  submittCondition.content = true;
}

function warning() {
  if (submittCondition.content === false) {
    alert();
  }
}

async function send() {
  if (submittCondition.content === false || submittCondition.feature === false) {
    alert('You must add a geometry to the map and and some text info before submmit');
  } else {
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
}
