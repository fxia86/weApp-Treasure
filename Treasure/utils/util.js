const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isSignedOn = () => {
  let last = wx.getStorageSync('lastSignedTime')
  return last ? new Date(last).toDateString() === new Date().toDateString() : false
}

const formatCoupon = coupon => {
  var coupon_info = coupon.coupon_info
  if (coupon.coupon_info){
  coupon.coupon_price = parseFloat(coupon_info.substring(coupon_info.indexOf('减') + 1, coupon_info.lastIndexOf('元')))
  coupon.final_price = (parseFloat(coupon.zk_final_price) - coupon.coupon_price).toFixed(2)
  }
  return coupon
}

module.exports = {
  formatTime: formatTime,
  formatCoupon: formatCoupon,
  isSignedOn: isSignedOn
}
