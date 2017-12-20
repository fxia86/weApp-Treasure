const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    currentTab: 0,
    content: '',
    pageIndex: 0,
    catagory: ['全部', '女装', '男装', '内衣', '母婴', '美妆', '居家', '鞋包', '配饰', '美食', '数码', '户外'],
    goods: [],
    hasMore: true
  },
  onLoad: function (options) {
    this.searchCoupon()
  },
  navbarTap: function (e) {
    var idx = e.currentTarget.dataset.idx
    if (this.data.currentTab != idx) {
      this.setData({
        currentTab: idx,
        content: idx > 0 ? this.data.catagory[idx] : '',
        pageIndex: 0,
        goods: []
      })
      this.searchCoupon()
    }
  },
  searchCoupon: function () {
    var that = this;
    wx.request({
      url: "https://api.xiafeng.xyz/searchCoupon",
      data: { content: that.data.content, page: that.data.pageIndex },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: (res) => {
        if (res.statusCode == 200 && res.data.length > 0) {
          var data = res.data.map(util.formatCoupon);
          that.setData({
            goods: that.data.goods.concat(data),
            hasMore: data.length == 20
          });
        }
        else {
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
  },
  gotoDetail: function (e) {
    wx.setStorageSync('goods', this.data.goods[e.currentTarget.dataset.idx])
    wx.navigateTo({
      url: '../detail/detail'
    })
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