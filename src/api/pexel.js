import request from '@/utils/request'

//获取图片数据列表
export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    method: 'GET',
    params: data
  })
}

/**
 * 获取搜索提示
 */
 export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    method: 'GET',
    params: {
      q
    }
  })
}

/**
 * 获取推荐主题
 */
 export const getThemes = () => {
  return request({
    url: '/pexels/themes',
    method: 'GET'
  })
}

/**
 * 获取指定图片数据
 */
 export const getPexelsFromId = (id) => {
  return request({
    url: `/pexels/${id}`,
    method: 'GET'
  })
}
