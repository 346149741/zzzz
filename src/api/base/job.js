import request from '@/utils/request'
import { moduleurl } from './main'
export function jobList() {
  return request({
    url: `/${moduleurl}/job`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: `/${moduleurl}/job`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/${moduleurl}/job`,
    method: 'put',
    data: data
  })
}

export function remove(jobName) {
  return request({
    url: `/${moduleurl}/job/remove/` + jobName,
    method: 'delete'
  })
}

export function pause(jobName) {
  return request({
    url: `/${moduleurl}/job/pause/` + jobName,
    method: 'post'
  })
}

export function resume(jobName) {
  return request({
    url: `/${moduleurl}/job/resume/` + jobName,
    method: 'post'
  })
}

export function trigger(jobName) {
  return request({
    url: `/${moduleurl}/job/trigger/` + jobName,
    method: 'post'
  })
}
