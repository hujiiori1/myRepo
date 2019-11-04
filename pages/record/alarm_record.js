// pages/record/alarm_record.js
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarmRecords: [],
    page: 0,
    count:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: urlList.getAlarmRecordsUrl,
      data: {
        token: app.globalData.token,
        page:this.data.page,
        count:this.data.count
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            alarmRecords:res.data.list
          })
        } else {

        }
      }
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
      url: urlList.getAlarmRecordsUrl,
      data: {
        count: this.data.count,
        page: this.data.page,
        status: this.data.status,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          alarmRecords: that.data.alarmRecords.concat(res.data.list)
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  }
})