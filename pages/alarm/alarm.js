// pages/alarm/alarm.js
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAlert: true,
    //0-未连接 1-连接中 
    connectionStatus: 0,
    windowHeight:0,
    timer:null
  },
  openNotification: function () {

  },
  toVerify: function () {
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
  },
  //事件处理函数
  GoToReport: function () {
    if (app.globalData.userInfo.isAuthenticated) {
      wx.navigateTo({
        url: '../report/report',
      })
    }
    else {
      this.toVerify()
    }
  },
  RequestConnect: function () {
    if (this.data.connectionStatus == 1)
    {
      wx.showToast({
        title: '已取消等待',
      })
      if(this.data.timer!=null)
      {
        clearInterval(this.data.timer)
      }
      this.setData({
        connectionStatus:0
      })
      return
    }
      
    if (!app.globalData.userInfo.isAuthenticated) {
      this.toVerify()
      return
    }

    this.setData({
      connectionStatus: 1
    })
    var that = this
    //$$发起连接请求
    wx.request({
      url: urlList.createConnectionUrl,
      data: {
        token: app.globalData.token
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200 || res.data.code == 300) {
          wx.showToast({
            title: '请求连接成功',
          })
          that.data.timer = setInterval(function () {
            wx.request({
              url: urlList.getConnectionRoomUrl,
              data: {
                id: res.data.ALARM_CALL_ID,
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
                      status:1,
                      token: app.globalData.token
                    },
                    success(res) {
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
                  //稍后再试

                }
              }
            })
          }, 5000);
        } else {
          wx.showToast({
            title: '请求连接失败',
          })
          that.setData({
            connectionStatus: 0
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求连接失败',
        })
        this.setData({
          connectionStatus: 0
        })
      }
    })
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
    wx.getSystemInfo({
      success: res => {
        this.setData(
          {
            windowHeight:res.windowHeight*res.pixelRatio
          }
        )
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //wx.showModal({
    // title: '弹窗标题',
    //  content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内，弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    //   confirmText: "同意",
    //  showCancel: false,
    //   success: function (res) {
    //    console.log(res);
    //    if (res.confirm) {
    //     console.log('用户点击主操作')
    //   } else {
    //     console.log('用户点击辅助操作')
    //    }
    // }
    //});

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

