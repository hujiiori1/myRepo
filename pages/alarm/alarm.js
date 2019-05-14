// pages/alarm/alarm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openNotification: function () {

  },
  //事件处理函数
  GoToReport: function () {
    if (app.globalData.userInfo.isAuthenticated) {
      wx.navigateTo({
        url: '../report/report',
      })
    }
    else {
      wx.showModal({
        title: '',
        content: '该业务需要实名认证',
        confirmText: "去认证",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.navigateTo({
              url: '../verify/verify?canSkip=false',
            })
          } else {
          }
        }
      })
    }
  },
  RequestConnect: function () {
    //$$发起连接请求
    var timer = setInterval(function()
    {
      wx.showActionSheet({
        itemList: ['接听','取消'],
        success: function (res){
          clearInterval(timer);
        },
        fail: function (res) { },
      })
      var canConnect = false
      if (canConnect) {
        //调用音视频连接
        wx.navigateTo({
          url: '../room/room',
        })
      }
      else {
        //稍后再试
      }
    },5000);
    
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
    wx.setNavigationBarTitle({
      title: '报警服务',
    });
    wx.showModal({
      title: '弹窗标题',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      confirmText: "同意",
      showCancel: false,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  
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

