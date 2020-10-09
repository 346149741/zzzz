import GeoJSON from 'ol/format/GeoJSON'

export function writeFeature(fea) {
  const json = (new GeoJSON()).writeFeatureObject(fea, {
    featureProjection: 'EPSG:3857'
  })
  if (json.properties === null) {
    json.properties = {}
  }
  return JSON.stringify(json)
}

export function GeoJSONToFeature(geojson) {
  if (typeof geojson === 'string') geojson = JSON.parse(geojson)
  if (geojson.type === 'FeatureCollection') {
    return (new GeoJSON()).readFeatures(geojson, {
      featureProjection: 'EPSG:3857'
    })
  } else {
    return (new GeoJSON()).readFeature(geojson, {
      featureProjection: 'EPSG:3857'
    })
  }
}
