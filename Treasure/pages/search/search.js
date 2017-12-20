Page({
  onPageScroll: function (e) {
    var top = 260 - e.scrollTop;
    if (top >= 80) {
      this.setData({
        search_style: 'search-f',
        search_top: top + 'rpx'
      })
    }
    else {
      this.setData({
        search_style: 'search-m',
        search_top: 0
      })
    }
  },
  data: {
    search_style: 'search-f',
    search_top: '260rpx',
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  search: function (e) {
    var that = this;
    if (that.data.content && that.data.content.length > 0) {
      wx.navigateTo({
        url: 'result/result?content=' + that.data.content
      })
    }
    else {
      wx.showToast({
        title: '输入商品名称',
        image: '/images/icon/smile.png'
      });
    }
  }
})  