
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    newslist: [],
    page: 0,
    count: 10
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: urlList.GetNewsListUrl,
      data: {
        token: app.globalData.token,
        page: this.data.page,
        count: this.data.count
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            newslist: res.data.list
          })
        }
      }
    })
  },
  toNewsDetail: function (e) {
    wx.navigateTo({
      url: '../webLink/webLink?link=' + encodeURIComponent(e.currentTarget.dataset.link),
    })
  },
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    // 页数+1
    this.setData({
      page: this.data.page + 1
    })
    wx.request({
      url: urlList.GetNewsListUrl,
      data: {
        count: this.data.count,
        page: this.data.page,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          newslist: that.data.newslist.concat(res.data.list)
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})