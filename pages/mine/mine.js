// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    wxUserInfo: {}
  },

  toVerify: function () {
    wx.navigateTo({
      url: '../verify/verify?canSkip=false&action=0',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    this.setData({
      userInfo: app.globalData.userInfo,
      wxUserInfo: app.globalData.wxUserInfo,
    })
    console.log(this.data.userInfo.isAuthenticated)
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