const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    signedPoints: wx.getStorageSync('signedPoints') || 0,
    sharedPoints: 0,
    usedPoints: 0,
    signedOn: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (util.isSignedOn()) {
      this.setData({
        signedOn: true,
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  signOn: function () {
    if (!this.data.signedOn) {
      let signedPoints = this.data.signedPoints + 10;
      this.setData({
        signedPoints: signedPoints,
        signedOn: true,
      })
      wx.setStorageSync('signedPoints', signedPoints)
      wx.setStorageSync('lastSignedTime', new Date().getTime())
      wx.showToast({
        title: '签到成功，积分+10',
        image: '/images/icon/kiss.png'
      })
    }
    else {
      wx.showToast({
        title: '今天已经签到',
        image: '/images/icon/smile.png'
      })
    }
  },
  comingSoon: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'loading'
    })
  },
  showRule: function () {
    // wx.showModal({
    //   content: '签到得10积分，分享得*积分，积分可以抽奖或在商城兑换礼品哦！',
    //   showCancel: false,
    //   confirmText: '知道啦',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    this.setData({
      showRuleModal: true
    })
  },
  hideRule:function  (){
    this.setData({
      showRuleModal:false
    })
  }
})


