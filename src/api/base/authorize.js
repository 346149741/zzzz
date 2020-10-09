import request from '@/utils/request'
import { moduleurl } from './main'
export const peoplespage = (listQuery) => {
  return request({
    url: `/${moduleurl}/staffgroup/page`,
    method: 'post',
    data: listQuery
  })
}
export const peoplesave = (listQuery) => {
  return request({
    url: `/${moduleurl}/staffgroup`,
    method: 'post',
    data: listQuery
  })
}
export const peoplesput = (listQuery) => {
  return request({
    url: `/${moduleurl}/staffgroup`,
    method: 'put',
    data: listQuery
  })
}
export const peoplesget = (id) => {
  return request({
    url: `/${moduleurl}/staffgroup/` + id,
    method: 'get'
  })
}
export const peoplesdel = (id) => {
  return request({
    url: `/${moduleurl}/staffgroup/` + id,
    method: 'delete'
  })
}
export const peoplespower = (id) => {
  return request({
    url: `/${moduleurl}/staffgroup/`+id+`/getStaffGroupAuthorityList`,
    method: 'post',
  })
}
export const addpeoplespower = (listQuery) => {
  return request({
    url: `/${moduleurl}/staffgroup/addAuthorityByGroupId`,
    method: 'post',
    data: listQuery
  })
}
export const peoplespowerdel = (a,b) => {
  return request({
    url: `/${moduleurl}/staffgroup/`+a+`/`+b+`/deleteAuthorityByGroupId`,
    method: 'get'
  })
}
export const peoplesgrouppage = (listQuery) => {
  return request({
    url: `/${moduleurl}/staffgroup/group-page`,
    method: 'post',
    data: listQuery
  })
}
export const addpeoples = (arr,id) => {
  return request({
    url: `/${moduleurl}/staffgroup/add-staff/${id}`,
    method: 'post',
    data: arr
  })
}
export const delpeoples = (a,b) => {
  return request({
    url: `/${moduleurl}/staffgroup/delete-staff/${a}/${b}`,
    method: 'post',
  })
}



export const carspage = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/page`,
    method: 'post',
    data: listQuery
  })
}
export const carssave = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo`,
    method: 'post',
    data: listQuery
  })
}
export const carsput = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo`,
    method: 'put',
    data: listQuery
  })
}
export const carsget = (id) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/` + id,
    method: 'get'
  })
}
export const carsdel = (id) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/` + id,
    method: 'delete'
  })
}
export const carspowerdel = (a,b) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/`+a+`/`+b+`/deleteAuthorityByGroupId`,
    method: 'get'
  })
}
export const carsgrouppage = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/getCarByGroupPage`,
    method: 'post',
    data: listQuery
  })
}
export const carspower = (id) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/`+id+`/getGroupCarAreaAuthorityList`,
    method: 'get',
  })
}
export const addcarspower = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/addAuthorityByGroupId`,
    method: 'post',
    data: listQuery
  })
}
export const getUnSelCarPage = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/getCarInfoByNotInIdsList`,
    method: 'post',
    data: listQuery
  })
}
export const saveSelCar = (listQuery) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/saveCarByGroup`,
    method: 'post',
    data: listQuery
  })
}
export const delcar = (a,b) => {
  return request({
    url: `/${moduleurl}/carGroupInfo/delCarByGroup/${a}/${b}`,
    method: 'post',
  })
}