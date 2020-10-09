import request from '@/utils/request'
import { protecturl } from './main'
// 查询巡更项目列表接口
export const getList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolitem/page`,
    method: 'post',
    data: listQuery
  })
}
// 添加巡更项目接口
export const addPatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolitem`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更项目接口
export const updatePatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolitem`,
    method: 'PUT',
    data: listQuery
  })
}

// 删除巡更项目接口
export const delPatrolObj = (id) => {
  return request({
    url: `/${protecturl}/patrolitem/` + id,
    method: 'delete'
  })
}

// 查询巡更时段列表接口
export const getpatroltime = (listQuery) => {
  return request({
    url: `/${protecturl}/patroltime/PatrolTimePage`,
    method: 'post',
    data: listQuery
  })
}

// 添加巡更时段接口
export const addpatroltime = (listQuery) => {
  return request({
    url: `/${protecturl}/patroltime`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更时段接口
export const updatepatroltime = (listQuery) => {
  return request({
    url: `/${protecturl}/patroltime`,
    method: 'PUT',
    data: listQuery
  })
}

// 根据id查询巡更时段详情接口
export const selectroltime = (id) => {
  return request({
    url: `/${protecturl}/patroltime/` + id,
    method: 'get'
  })
}

// 删除巡更时段接口
export const delpatroltime = (id) => {
  return request({
    url: `/${protecturl}/patroltime/` + id,
    method: 'delete'
  })
}

