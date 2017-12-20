Page({
  data: {
    goods: {}
  },
  onLoad: function () {
    this.setData({
      goods: wx.getStorageSync('goods')
    })
  },
  getTKL: function () {
    let goods = this.data.goods;
    if (goods) {
      wx.request({
        url: "https://api.xiafeng.xyz/getTKL",
        data: { title: goods.title, coupon: goods.coupon_click_url, url: goods.item_url, pic: goods.pict_url },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: (res) => {
          if (res.statusCode == 200 && res.data.length > 0) {
            wx.setClipboardData({
              data: res.data,
              success: function (res) {
                wx.showModal({
                  title: '',
                  content: '复制成功！快去手机淘宝下单吧',
                  showCancel: false,
                  confirmText: '知道啦'
                })
              }
            })
            wx.showModal({
              title: '',
              content: '复制成功！快去手机淘宝下单吧',
              showCancel: false,
              confirmText: '知道啦'
            })
          }
          else {
            wx.showToast({
              title: '君君晕倒了，等会再试试',
              image: '/images/icon/smile.png'
            })
          }
        },
        fail: function (e) {
          console.log(e)
          wx.showToast({
            title: '出错啦',
            image: '/images/icon/smile.png'
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})