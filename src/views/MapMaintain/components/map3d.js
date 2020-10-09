import Global from '@/store/global_variable.js'
import NewMap3d from '@/components/CesiumMap/Map'
import {
  flowPolyline
} from '@/components/CesiumMap/Effects.js'

export function init(id, cfg) {
  if (cfg.baseLayerType === 'google') {
    cfg.crs = 'GCJ-02'
    cfg.centeropt = {}
    cfg.centeropt.xmin = cfg.viewExtent[0]
    cfg.centeropt.xmax = cfg.viewExtent[2]
    cfg.centeropt.ymin = cfg.viewExtent[1]
    cfg.centeropt.ymax = cfg.viewExtent[3]
  }

  const newMap3d = new NewMap3d(id, cfg)
  Global.map3d = newMap3d
  Global.map2d = null
  // 初始化流动纹理线
  flowPolyline()
}
