import * as validate from './validate'

/**
 * 判断是否为手机号
 * @param rule
 * @param value
 * @param callback
 */
export function isTel(rule, value, callback) {
  if (value === undefined || value === null) {
    value = ''
  }
  // 非必填项时校验通过
  if (value !== '') {
    if (!validate.isTel(value)) {
      callback(new Error('请输入正确的手机号码！'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**
 * 验证是否为身份证号码
 * @param rule
 * @param value
 * @param callback
 */
export function isIdcard(rule, value, callback) {
  if (!validate.isIdcard(value)) {
    callback(new Error('请输入正确的身份证号码！'))
  } else {
    callback()
  }
}
