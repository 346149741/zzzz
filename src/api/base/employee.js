import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  getOrgDeptTree() {
    return request({
      url: `/${moduleurl}/dept/tree`,
      method: 'get'
    })
  },
  list(listQuery) {
    return request({
      url: `/${moduleurl}/employee/page`,
      method: 'post',
      data: listQuery
    })
  },
  checkCode(data) {
    return request({
      url: `/${moduleurl}/employee/check/no`,
      method: 'get',
      params: data
    })
  },
  checkPhone(data) {
    return request({
      url: `/${moduleurl}/employee/check/phone`,
      method: 'get',
      params: data
    })
  },
  save(data) {
    return request({
      url: `/${moduleurl}/employee`,
      method: 'post',
      data
    })
  },
  updateItem(data) {
    return request({
      url: `/${moduleurl}/employee`,
      method: 'put',
      data
    })
  },
  enable(id) {
    return request({
      url: `/${moduleurl}/employee/enable/` + id,
      method: 'put'
    })
  },
  delete(id) {
    return request({
      url: `/${moduleurl}/employee/` + id,
      method: 'delete'
    })
  },
  upload(file) {
    return request({
      url: `/${moduleurl}/file/upload/head`,
      method: 'post',
      data: file,
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
  },
  saveCertificate(data) {
    return request({
      url: `/${moduleurl}/certificate/add`,
      method: 'post',
      data
    })
  },
  getCertificate(id) {
    return request({
      url: `/${moduleurl}/certificate/detail/` + id,
      method: 'get'
    })
  },
  getCertificateList(id) {
    return request({
      url: `/${moduleurl}/certificate/list/` + id,
      method: 'get'
    })
  },
  updateCertificate(data) {
    return request({
      url: `/${moduleurl}/certificate/update`,
      method: 'put',
      data
    })
  },
  deleteCertificate(id) {
    return request({
      url: `/${moduleurl}/certificate/` + id,
      method: 'delete'
    })
  },
  getpeoplespage(data) {
    return request({
      url: `/${moduleurl}/staff-info/page`,
      method: 'post',
      data
    })
  },
  savepeoples(data) {
    return request({
      url: `/${moduleurl}/staff-info`,
      method: 'post',
      data
    })
  },
  putpeoples(data) {
    return request({
      url: `/${moduleurl}/staff-info`,
      method: 'put',
      data
    })
  },
  getpeoples(id) {
    return request({
      url: `/${moduleurl}/staff-info/` + id,
      method: 'get'
    })
  },
  getAllpeoples() {
    return request({
      url: `/${moduleurl}/staff-info`,
      method: 'get'
    })
  },
  delpeoples(id) {
    return request({
      url: `/${moduleurl}/staff-info/` + id,
      method: 'delete'
    })
  },
  getworkerspage(data) {
    return request({
      url: `/${moduleurl}/worker/page`,
      method: 'post',
      data
    })
  },
  saveworkers(data) {
    return request({
      url: `/${moduleurl}/worker`,
      method: 'post',
      data
    })
  },
  putworkers(data) {
    return request({
      url: `/${moduleurl}/worker`,
      method: 'put',
      data
    })
  },
  getworkers(id) {
    return request({
      url: `/${moduleurl}/worker/` + id,
      method: 'get'
    })
  },
  getAllworkers() {
    return request({
      url: `/${moduleurl}/worker`,
      method: 'get'
    })
  },
  delworkers(id) {
    return request({
      url: `/${moduleurl}/worker/` + id,
      method: 'delete'
    })
  }
}
