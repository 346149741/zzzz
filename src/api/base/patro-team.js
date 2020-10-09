import request from '@/utils/request'
import { protecturl } from './main'
// 查询班组列表接口
export const getList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolclass/page`,
    method: 'post',
    data: listQuery
  })
}

// 查看班组详情接口
export const lookPatrolObj = (id) => {
  return request({
    url: `/${protecturl}/patrolclass/getPatrolClassInfoById/` + id,
    method: 'get'
  })
}

// 添加班组接口
export const addPatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolclass/addPatrolClassInfo`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更项目接口
export const updatePatrolObj = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolclass/updatePatrolClassInfo`,
    method: 'post',
    data: listQuery
  })
}

// 删除班组数据接口
export const delPatrolObj = (id) => {
  return request({
    url: `/${protecturl}/patrolclass/deletePatrolClassInfoById/` + id,
    method: 'get'
  })
}

// 查询计划列表接口
export const getpatrolplanList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolplan/patrolPlanPage`,
    method: 'post',
    data: listQuery
  })
}

// 添加巡更计划接口
export const addpatrolplan = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolplan`,
    method: 'post',
    data: listQuery
  })
}

// 更新巡更计划接口
export const updatepatrolplan = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolplan`,
    method: 'put',
    data: listQuery
  })
}

// 根据id查询计划详情接口
export const lookpatrolplan = (id) => {
  return request({
    url: `/${protecturl}/patrolplan/` + id,
    method: 'get'
  })
}

// 删除巡更计划接口
export const delpatrolplan = (id) => {
  return request({
    url: `/${protecturl}/patrolplan/` + id,
    method: 'delete'
  })
}

// 分页查询巡更路线列表接口
export const getrouteList = (listQuery) => {
  return request({
    url: `/${protecturl}/patrolroute/page`,
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

// 查询巡更时段列表接口
export const getpatroltime = (listQuery) => {
  return request({
    url: `/${protecturl}/patroltime/PatrolTimePage`,
    method: 'post',
    data: listQuery
  })
}

// 查询巡更记录列表接口
export const getpatrollog = (listQuery) => {
  return request({
    url: `/${protecturl}/patrollog/page`,
    method: 'post',
    data: listQuery
  })
}

// 根据路径id查看巡更记录接口
export const lookpatrollog = (id) => {
  return request({
    url: `/${protecturl}/patrollog/` + id,
    method: 'get'
  })
}

// 根据路径id查看巡更记录表格接口
export const lookTable = (id) => {
  return request({
    url: `/${protecturl}/patrollog/getPatrolPointLog/` + id,
    method: 'get'
  })
}
// 查询所有巡更路线接口
export const getallrouteList = () => {
  return request({
    url: `/${protecturl}/patrolroute`,
    method: 'get'
  })
}

// 查询所有巡更班组数据接口
export const getallteamList = () => {
  return request({
    url: `/${protecturl}/patrolclass`,
    method: 'get'
  })
}

// 查询所有巡更班组数据接口
export const getallplanList = () => {
  return request({
    url: `/${protecturl}/patrolplan`,
    method: 'get'
  })
}

