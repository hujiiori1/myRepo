//获取应用实例
// pages/addMobile/addMobile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  checkVerifyCode: function () {
    //$$接口判断验证码是否正确
    var isVerified = "true";
    if (isVerified) {
      if (app.globalData.userInfo.isAuthenticated) {
        wx.switchTab({
          url: '../alarm/alarm'
        });
      } else {
        wx.navigateTo({
          url: '../verify/verify'
        });
      }
    }
    else
    {
      //弹框
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})