// pages/report/report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    reporterName: null,
    reporterMobileNo: null,
    reportContent: null,
    eventLocation: null,
    currentLocation: null,
    pics: [],
    video: ''
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pics: that.data.pics.concat(res.tempFilePaths)
        });
      }
    })
  },
  chooseVideo: function (e) {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          video: res.tempFilePath
        });
      }
    })
  },
  chooseEventLocation: function (e) {
    wx.chooseLocation({
      success: function (res) {
        this.eventLocation = res;
      },
    })
  },
  chooseCurrentLocation: function (e) {
    wx.chooseLocation({
      success: function (res) {
        this.currentLocation = res;
      },
    })
  },
  submitReport: function (e) {
    //$$接口提交report
    wx.navigateTo({
      url: '../msg/msg_success',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    wx.setNavigationBarTitle({
      title: '违法犯罪举报',
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

  }
})