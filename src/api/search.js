import request from '@/utils/request'
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getSearchRes = (q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page: 1,
      per_page: 10,
      q
    }
  })
}
