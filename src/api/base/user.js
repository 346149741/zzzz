import request from '@/utils/request'
import { moduleurl } from './main'
export function page(data) {
  return request({
    url: `/${moduleurl}/user/page`,
    method: 'post',
    data: data
  })
}

export function create(data) {
  return request({
    url: `/${moduleurl}/user`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/${moduleurl}/user`,
    method: 'put',
    data: data
  })
}
export function userRole(uid) {
  return request({
    url: `/${moduleurl}/user/role/` + uid,
    method: 'get'
    // params: { uid }
  })
}
export function del(ids) {
  return request({
    url: `/${moduleurl}/user/delete/batch`,
    method: 'delete',
    data: ids
  })
}

export function reset(ids) {
  return request({
    url: `/${moduleurl}/user/resetpass`,
    method: 'put',
    params: { ids }
  })
}

export function noAccount(data) {
  return request({
    url: `/${moduleurl}/employee/page/no/account`,
    method: 'post',
    data
  })
}

export function addRole(employeeIds) {
  return request({
    url: `/${moduleurl}/user/employee`,
    method: 'post',
    params: { employeeIds }
  })
}

export function saveRolePermission(rids, uids) {
  return request({
    url: `/${moduleurl}/user/grant`,
    method: 'put',
    params: { rids, uids }
  })
}

export function saveUserRole(uid, rids) {
  return request({
    url: `/${moduleurl}/user/` + uid + '/role/' + rids,
    method: 'put'
  })
}

export function saveUserDept(uid, dids) {
  return request({
    url: `/${moduleurl}/user/` + uid + '/dept/' + dids,
    method: 'put'
  })
}

export function getOrgDeptTree() {
  return request({
    url: `/${moduleurl}/dept/tree`,
    method: 'get'
  })
}

export function addDept(data) {
  return request({
    url: `/${moduleurl}/dept`,
    method: 'post',
    data: data
  })
}

export function updateDept(data) {
  return request({
    url: `/${moduleurl}/dept`,
    method: 'put',
    data: data
  })
}

export function delDept(id) {
  return request({
    url: `/${moduleurl}/dept/` + id,
    method: 'delete'
  })
}

export function getDeptById(id) {
  return request({
    url: `/${moduleurl}/dept/` + id,
    method: 'get'
  })
}

export function checkDeptCode(id, code) {
  return request({
    url: `/${moduleurl}/dept/check/code`,
    method: 'get',
    params: { id, code }
  })
}

export function deptInfo(uid) {
  return request({
    url: `/${moduleurl}/dept/info/` + uid,
    method: 'get'
  })
}

export function findUsersMenu() {
  return request({
    url: `/${moduleurl}/menu/user`,
    method: 'get'
  })
}

export function resetPass(data) {
  return request({
    url: `/${moduleurl}/user/changepass?newPass=` + data.newPass + '&oldPass=' + data.oldPass,
    method: 'put'
  })
}

export function getOrgType(id) {
  return request({
    url: `/${moduleurl}/organization/` + id,
    method: 'get'
  })
}
export function getOrgList(id) {
  return request({
    url: `/${moduleurl}/role/getByOrgType/` + id,
    method: 'get'
  })
}

