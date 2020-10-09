import Vue from 'vue'

/**
 * 摄像头弹窗
 */
import SingleCamera from './dialogs/SingleCamera'
const SingleCamera_CLS = Vue.extend(SingleCamera)
export class SingleCamera_Com {
  constructor(opts) {
    return new SingleCamera_CLS({
      data: opts
    }).$mount()
  }
}

/**
 * 摄像头列表
 */
import MultiCamera from './dialogs/MultiCamera'
const MultiCamera_CLS = Vue.extend(MultiCamera)
export class MultiCamera_Com {
  constructor(opts) {
    return new MultiCamera_CLS({
      data: opts
    }).$mount()
  }
}

/*
 *@Description:
 *@paramter:回放历史视频摄像头
 *@return:
 */
import PlayBackCamera from './dialogs/PlayBackCamera'
const PlayBackCamera_CLS = Vue.extend(PlayBackCamera)
export class PlayBackCamera_Com {
  constructor(opts) {
    return new PlayBackCamera_CLS({
      data: opts
    }).$mount()
  }
}
