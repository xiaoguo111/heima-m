import request from '@/utils/request.js'

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 * @param{String} mobile
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}
export const delMyChannel = (target) => {
  return request({
    url: `v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
