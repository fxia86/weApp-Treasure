const util = require('../../../utils/util.js')

Page({
  data: {
    pageIndex: 1,
    goods: [],
    hasMore: true,
    content: ''
  },
  onLoad: function (options) {
    this.setData({
      queryString: options.content,
      content: options.content
    })
    this.searchCoupon()
  },
  searchCoupon: function () {
    var that = this;
    if (that.data.content && that.data.content.length > 0) {
      wx.request({
        url: "https://api.xiafeng.xyz/searchCoupon",
        data: { content: that.data.content, page: that.data.pageIndex },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: (res) => {
          if (res.statusCode == 200 && res.data.length > 0) {
            var data = res.data.map(util.formatCoupon);
            that.setData({
              goods: that.data.content == that.data.queryString ? that.data.goods.concat(data) : data,
              hasMore: data.length == 20,
              queryString: that.data.content
            });
          }
          else{
            wx.showToast({
              title: '没有找到哦',
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
  gotoDetail: function (e) {
    wx.setStorageSync('goods', this.data.goods[e.currentTarget.dataset.idx])
    wx.navigateTo({
      url: '../../detail/detail'
    })
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  search: function (e) {
    if (this.data.content == this.data.queryString) {
      return false;
    }
    this.setData({
      pageIndex: 1
    })
    this.searchCoupon();
  },
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.data.pageIndex++;
      this.searchCoupon();
    }
    else {
      wx.showToast({
        title: '挖到底啦',
        image: '/images/icon/smile.png'
      })
    }
  }
})