import request from '@/utils/request'
import { protecturl } from './main'
// 查询巡更路线列表接口
export const getList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolroute/page`,
    method: 'post',
    data: listQuery
  })
}

// 查询所有巡更点接口
export const getPatrolpoint = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolpoint/findPatrolPointList`,
    method: 'post',
    data: listQuery
  })
}

// 添加巡更路线接口
export const addPatrolRouter = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolroute/patrolRouteSave`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更路径接口
export const updatePatrolRouter = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolroute/patrolRouteUpdate`,
    method: 'post',
    data: listQuery
  })
}

// 根据路径id查看巡更点接口
export const lookPatrolRoutr = (id) => {
  return request({
    url: `/${protecturl}/patrolroute/getPatrolRoute/` + id,
    method: 'get'
  })
}

// 删除巡更路线接口
export const delPatrolRoutr = (id) => {
  return request({
    url: `/${protecturl}/patrolroute/` + id,
    method: 'delete'
  })
}

