import VecLayer from '@/components/OLMap/core/VecLayer'
import { Stroke, Style, Text, Fill, Icon } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON'
import { asArray } from 'ol/color'

// 记得销毁循环
export default class FlashLayer extends VecLayer {
  constructor(opts = {}) {
    super(opts)
    // 通过interval 设置闪烁动画
    const _that = this
    this.flashInterval = setInterval(() => {
      const feas = _that.getFeatures()
      // 循环设置样式
      feas.forEach((item) => {
        // 点线面分别设置透明度
        const type = item.getGeometry().getType()
        const flag = !item.get('flashType')

        switch (type) {
          case 'Point':
          case 'MultiPoint':
            let optic = item.getStyle().getImage().getOpacity()
            if (flag) {
              optic += 0.05
            } else {
              optic -= 0.05
            }

            if (optic > 1) {
              optic = 1
              item.set('flashType', true)
            }
            if (optic < 0.3) {
              optic = 0.3
              item.set('flashType', false)
            }
            item.getStyle().getImage().setOpacity(optic)

            break
          case 'LineString':
          case 'Polygon':
            const color = (
              type === 'Polygon'
                ? asArray(item.getStyle().getFill().getColor())
                : asArray(item.getStyle().getStroke().getColor())
            )
            if (flag) {
              color[3] += 0.05
            } else {
              color[3] -= 0.05
            }

            if (color[3] > 1) {
              color[3] = 1
              item.set('flashType', true)
            }
            if (color[3] < 0.3) {
              color[3] = 0.3
              item.set('flashType', false)
            }
            item.getStyle().getFill().setColor(color)
            break
        }
      })
      _that.lyr.changed()
    }, 50)
  }

  stopFlash() {
    window.clearInterval(this.flashInterval)
  }
}
