// pages/verify/verify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSkip: true
  },
  //事件处理函数
  CheckID: function () {
    //$$接口认证身份信息
    var isAuthenticated = "true"
    if (isAuthenticated) {
      wx.switchTab({
        url: '../alarm/alarm'
      })
    }
    else {
      //弹出框
    }
  },
  Skip: function () {
    wx.switchTab({
      url: '../alarm/alarm'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.canSkip == "false") {
      canSkip = false
    }
    else {
      canSkip = true
    }
    wx.setNavigationBarTitle({
      title: '实名认证',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})

