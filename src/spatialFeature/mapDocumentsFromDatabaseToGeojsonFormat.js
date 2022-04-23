export default function mapDocumentsFromDatabaseToGeojsonFormat (documents, geometryParser) {
  return documents.map(document => {
    return {
      type: 'Feature',
      geometry: geometryParser(document.coordinates, document.type),
      properties: {
        id: document._id,
        description: document.description,
        enabled: document.enabled
      }
    }
  })
}
