import request from '@/utils/request'

//获取 VIP 支付数据
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list',
    method: 'GET'
  })
}


/**
 * 支付宝支付
 * @param {*} subject 支付标题
 * @param {*} totalAmount 支付价格
 * @param {*} body 支付描述
 * @param {*} isMobile 是否为移动端支付
 * @returns 
 */
 export const getAliPay = (subject, totalAmount, body, isMobile) => {
  return request({
    url: '/user/alipay',
    params: {
      subject,
      totalAmount,
      body,
      isMobile
    }
  })
}

/**
 * 获取支付结果
 * @param {*} out_trade_no 订单号
 * @returns 
 */
export const getPayResult = (out_trade_no) => {
  return request({
    url: '/sys/pay/result',
    params: {
      out_trade_no
    }
  })
}
