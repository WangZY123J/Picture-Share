import axios from 'axios'

const request = axios.create({ timeout: 5000 })

export const getPoetry = async () => {
  const res = await request({
    method: 'GET',
    url: 'https://v1.jinrishici.com/all.txt'
  })
  return res.data
}