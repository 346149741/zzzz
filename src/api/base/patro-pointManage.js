import request from '@/utils/request'
import { protecturl } from './main'
// 根据条件查询巡更点接口
export const getList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolpoint/findPatrolPointList`,
    method: 'post',
    data: listQuery
  })
}

// 查看巡更点详情接口
export const lookPatrolObj = (id) => {
  return request({
    url: `/${protecturl}/patrolpoint/` + id,
    method: 'get'
  })
}

// 添加巡更点接口
export const addPatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolpoint`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更点接口
export const updatePatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolpoint`,
    method: 'PUT',
    data: listQuery
  })
}

// 删除巡更点接口
export const delPatrolObj = (id) => {
  return request({
    url: `/${protecturl}/patrolpoint/` + id,
    method: 'DELETE'
  })
}

// 上传图片接口
export const upload = (file) => {
  return request({
    url: `/${protecturl}/patrolpoint/upload/head`,
    method: 'post',
    data: file,
    withCredentials: true // 表示跨域请求时是否需要使用凭证
  })
}

