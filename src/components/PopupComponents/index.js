import Vue from 'vue'

import patrolPoint from './patrolPoint' // 巡更点
const PatrolPoint_CLS = Vue.extend(patrolPoint)
export class PatrolPoint_Com {
  constructor(opts) {
    return new PatrolPoint_CLS({
      data: opts
    }).$mount()
  }
}
import CarPoint from './carPoint' // 定位监控
const CarPoint_CLS = Vue.extend(CarPoint)
export class CarPoint_Com {
  constructor(opts) {
    return new CarPoint_CLS({
      data: opts
    }).$mount()
  }
}

import gateDoor from './gateDoor' // 道闸
const GateDoor_CLS = Vue.extend(gateDoor)
export class GateDoor_Cmpt {
  constructor(opts) {
    return new GateDoor_CLS({
      data: opts
    }).$mount()
  }
}

import ControlCamera from './controlCamera.vue' //
const Control_Camera_CLS = Vue.extend(ControlCamera)
export class Control_Camera_Com {
  constructor(opts) {
    return new Control_Camera_CLS({
      data: opts
    }).$mount()
  }
}

import Perimeter from './perimeter.vue' //
const Perimeter_CLS = Vue.extend(Perimeter)
export class Perimeter_Com {
  constructor(opts) {
    return new Perimeter_CLS({
      data: opts
    }).$mount()
  }
}

import PerimeterCamera from './perCamera.vue' //
const PerimeterCamera_CLS = Vue.extend(PerimeterCamera)
export class PerimeterCamera_Com {
  constructor(opts) {
    return new PerimeterCamera_CLS({
      data: opts
    }).$mount()
  }
}
