const coordtransform = require('coordtransform')

export function wgs_gcj02(lng, lat) {
  return coordtransform.wgs84togcj02(lng, lat)
}

export function wgs_bd09(lng, lat) {
  const [lng_gcj, lat_gcj] = wgs_gcj02(lng, lat)
  return coordtransform.gcj02tobd09(lng_gcj, lat_gcj)
}

export function gcj02_wgs(lng, lat) {
  return coordtransform.gcj02towgs84(lng, lat)
}

export function bd09_wgs(lng, lat) {
  const [lng_gcj, lat_gcj] = coordtransform.bd09togcj02(lng, lat)
  return gcj02_wgs(lng_gcj, lat_gcj)
}
export function bd09_gcj(lng, lat) {
  return coordtransform.bd09togcj02(lng, lat)
}

export function unTransform(lng, lat) {
  return [lng, lat]
}

export function transformMethod(type) {
  let coordSwitchFuc = unTransform

  switch (type) {
    case 'google':
    case 'gaode':
      coordSwitchFuc = wgs_gcj02
      break
    case 'baidu':
      coordSwitchFuc = wgs_bd09
      break
  }
  return coordSwitchFuc
}

export default {
  wgs_gcj02, wgs_bd09, gcj02_wgs, bd09_wgs, bd09_gcj, unTransform
}
