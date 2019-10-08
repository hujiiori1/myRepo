// pages/alarm/alarm.js
const urlList = require('../../config.js');
const app = getApp();
var innerAudioContext = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    //0-未连接 1-连接中 
    connectionStatus: 0,
    timer: null,
    queue: 0,
    initAddress: '',
    initLatitude: '',
    initLongitude: ''
  },

  showReminder: function () {
    wx.showToast({
      title: '警方在需要了解现场情况时，会联系你，请注意接通。有急难险等危人身、财产公共安全时请直接拨打110',
      duration: 3000
    })

  },
  RequestConnect: function () {

    //this.showReminder()
    this.setData({
      connectionStatus: 1
    })
    var that = this
    //$$发起连接请求
    wx.request({
      url: urlList.createConnectionUrl,
      data: {
        token: app.globalData.token,
        address: that.data.initAddress,
        lng: that.data.initLongitude,
        lat: that.data.initLatitude
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200 || res.data.code == 300) {
          wx.showToast({
            title: '请求视频成功',
          })
          that.playConnectAudio()
          that.setData({
            queue: res.data.queue
          })
          that.data.timer = setInterval(function () {
            wx.request({
              url: urlList.getConnectionRoomUrl,
              data: {
                id: res.data.id,
                token: app.globalData.token
              },
              success(res) {
                console.log(res);
                if (res.data.code == 200) {
                  var roomID = res.data.room
                  clearInterval(that.data.timer)
                  that.setData({
                    connectionStatus: 0
                  })
                  //记录接入时间
                  wx.request({
                    url: urlList.changeStatusAlarmUrl,
                    data: {
                      id: res.data.id,
                      status: "1",
                      token: app.globalData.token
                    },
                    success(res) {
                      console.log(res);
                      //调用音视频连接
                      wx.navigateTo({
                        url: "../webrtc-room/room/room?roomID=" + roomID
                          + "&userId=" + app.globalData.userInfo.userid
                          + "&userSig=" + app.globalData.userInfo.usersig
                          + "&template=float",
                      })
                    }
                  })

                }
                else {
                  that.setData({
                    queue: res.data.queue
                  })
                  //稍后再试

                }
              }
            })
          }, 5000);
        } else {
          wx.showToast({
            title: '请求连接失败',
          })
          that.CancelConnect();
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求连接失败',
        })
        that.CancelConnect();
      }
    })
  },
  CancelConnect: function () {
    if (this.data.connectionStatus == 1) {
      wx.showToast({
        title: '已取消等待',
      })
      if (this.data.timer != null) {
        clearInterval(this.data.timer)
      }
      this.setData({
        connectionStatus: 0
      })
    }
    this.playOffAudio()
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext = wx.createInnerAudioContext()
    this.setData({
      initAddress: options.address,
      initLongitude: options.longitude,
      initLatitude: options.latitude
    })
  },
  playConnectAudio: function()
  {
    innerAudioContext.loop = true
    innerAudioContext.src = 'https://wx110.xk-health.com/download/wxjs/rev_video.mp3'
    innerAudioContext.play()
  },
  playOffAudio: function()
  {
    innerAudioContext.loop = false
    innerAudioContext.src = 'https://wx110.xk-health.com/download/wxjs/close_video.mp3'
    innerAudioContext.play()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData(
          {
            windowHeight: res.windowHeight * res.pixelRatio
          }
        )
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.RequestConnect();
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

