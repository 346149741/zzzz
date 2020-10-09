import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'
import { moduleurl } from './main'
export const dictOrg = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1003,
      itemCode: ''
    }
  })
}

export const dictSex = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1001,
      itemCode: ''
    }
  })
}

export const dictPost = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 2002,
      itemCode: ''
    }
  })
}

export const dictEdu = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1002,
      itemCode: ''
    }
  })
}
export const dictProj = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1004,
      itemCode: ''
    }
  })
}
export const dictProDetail = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 2003,
      itemCode: ''
    }
  })
}

export const dictmapTypeList = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1005,
      itemCode: ''
    }
  })
}

export const dictmapDisplayType = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1006,
      itemCode: ''
    }
  })
}
export const dictmapServerType = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 1008,
      itemCode: ''
    }
  })
}
export const dictRanks = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 3001,
      itemCode: ''
    }
  })
}
export const dictNation = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 3002,
      itemCode: ''
    }
  })
}
export const dictPeoplestype = () => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: 3003,
      itemCode: ''
    }
  })
}
// 根据 code 查询 四至
export const dictRegionExtent = (code) => {
  return request({
    url: `/${moduleurl}/region/envelope/` + code,
    method: 'get'
  })
}
// 根据code 查询 范围
export const dictRegionGeoJSON = (code) => {
  return request({
    url: `/${moduleurl}/region/range/` + code,
    method: 'get'
  })
}
// 根据项目id查询 范围和四至
// todo 后续修改一张图的项目范围
export const dictRegionDetail = (proId) => {
  return request({
    url: `/${moduleurl}/project/range/` + proId,
    method: 'get'
  })
}

export const dictRegion = () => {
  return axios.get(process.env.VUE_APP_PROJECT_BASE + 'static/region/region.json')
}

export const dictCode = (code) => {
  return request({
    url: `/${moduleurl}/dict/item/detail`,
    method: 'get',
    params: {
      typeCode: code,
      itemCode: ''
    }
  })
}

export const dictBatch = (typeCodes) => {
  return request({
    url: `/${moduleurl}/dict/item/detail/batch`,
    method: 'get',
    params: {
      typeCodes
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

export const dictTest = (code) => {
  return request({
    url: '/vue-element-admin/dict/test',
    method: 'get',
    params: {
      typeCode: code,
      itemCode: ''
    }
  })
}
