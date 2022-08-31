import store from '@/store'
import { getAliPay } from '@/api/pay'
import { isMobileTerminal } from '@/utils/flexible'

/**
 * 触发支付宝支付
 * @param {*} title 支付标题
 * @param {*} desc 描述
 */
export const aliPay = async (title, desc) => {
  const { encodeURI } = await getAliPay(
    title,
    '0.01',
    desc,
    isMobileTerminal.value
  )
  //解码
  window.location.href = decodeURIComponent(encodeURI)
}
