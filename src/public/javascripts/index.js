const initialCordinates = [-27.59, -48.54]
const initialZoom = 12

// eslint-disable-next-line no-undef
const leaflet = L
const map = leaflet.map('map').setView(initialCordinates, initialZoom)

const baseLayer = leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
})

const obj = {}

const submittCondition = {
  feature: false,
  content: false
}

baseLayer.addTo(map)

async function getData (callback) {
  try {
    const response = await fetch('/feature/all')
    const geoData = await response.json()
    console.log(geoData)
    callback(geoData)
  } catch (err) {
    console.log(err)
  }
}

async function deleteFeat () {
  try {
    const rawResponse = await fetch(`/mapData/${this.featId}`, { method: 'DELETE' })
    const response = await rawResponse.json()
    console.log(response)
  } catch (err) {
    console.log(err)
    /**
     * TODO:
     * make a better error handling system
     */
  }
}

function callDelete (id) {
  deleteFeat.call({ featId: id })
}

getData((geoData) => {
  leaflet.geoJSON(geoData, {

    onEachFeature: (feature, layer) => {
      if (feature.properties && feature.properties.popupContent) {
        console.log(feature.properties.featId)
        layer.bindPopup(`${feature.properties.popupContent} <button onclick="callDelete('${feature.properties.featId}')">delete</button>`)
        // layer.bindPopup(feature.properties.popupContent)
      }
    }

  }).addTo(map)
})

const drawnItems = new leaflet.FeatureGroup()
map.addLayer(drawnItems)

const drawControl = new leaflet.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: false,
    rectangle: false,
    marker: true,
    circlemarker: false
  }
})
map.addControl(drawControl)

map.on(leaflet.Draw.Event.CREATED, (event) => {
  const { layer, layerType } = event

  if (layerType === 'polygon') {
    obj.type = layerType
    obj.coords = layer._latlngs.flat()
  } else {
    obj.type = 'point'
    obj.coords = layer._latlng
  }

  submittCondition.feature = true
  map.addLayer(layer)
})

function isEmpty (obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

csForm.onsubmit = async (e) => {
  e.preventDefault()

  try {
    if (isEmpty(obj.coords)) throw new Error('You must add some geometry on the map')

    const formObjt = new FormData(csForm)

    obj.info = formObjt.get('info')

    const response = await fetch('/feature/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    if (response.status === 201) {
      alert('Success!')
      location.reload()
    } else {
      throw new Error('Sorry, something went wrong. An error has occurred on the server. Please, try again')
    }
  } catch (err) {
    alert(err)
    location.reload()
  }
}
