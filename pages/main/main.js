// pages/main/main.js
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    carousel: [],
    newslist: [],
    page: 1,
    count: 10
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: urlList.GetNewscarouselUrl,
      data: {
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            carousel: res.data.list
          })
        }
      }
    })
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
  toAlarm: function (e) {
    wx.switchTab({
      url: '../alarm/alarm',
    })
  },
  toHelp: function (e) {
    wx.switchTab({
      url: '../help/help',
    })
  },
  toMap: function (e) {
    wx.switchTab({
      url: '../map/map',
    })
  },
  toBusiness: function (e) {
    wx.switchTab({
      url: '../business/business',
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
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})