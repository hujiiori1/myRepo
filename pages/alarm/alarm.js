// pages/alarm/alarm.js
const urlList = require('../../config.js');
const app = getApp();
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertType: 1,
    showAlert: false,
    alertAgreed: false,
    //0-未连接 1-连接中 
    windowHeight: 0,
    action: 0,

    province: '',
    city: '',
    address: '',
    latitude: '',
    longitude: ''
  },
  openNotification: function () {

  },
  doShowAlert: function () {
    if (this.data.alertAgreed == false) {
      this.setData({
        showAlert: true
      })
      return true
    }
    else {
      return false
    }
  },
  agree: function () {
    this.setData({
      showAlert: false,
      alertAgreed: true
    })

    if (this.data.action == 1) {
      this.GoToReport()
    }
    else if (this.data.action == 2) {
      this.GoToVideo()
    }

  },
  disAgree: function () {
    this.setData({
      showAlert: false,
      alertAgreed: false
    })
  },
  toVerify: function () {
    var that=this
    wx.showModal({
      title: '',
      content: '该业务需要实名认证',
      confirmText: "去认证",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.navigateTo({
            url: '../verify/verify?canSkip=false&action=' + that.data.action
          })
        } else {
        }
      }
    })
  },
  showReminder: function () {
    wx.showToast({
      title: '警方在需要了解现场情况时，会联系你，请注意接通。有急难险等危人身、财产公共安全时请直接拨打110',
      duration: 3000
    })

  },
  //事件处理函数
  GoToReport: function () {
    if (this.data.showAlert == true) {
      return;
    }
    else if (this.data.city != "无锡市") {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '违法举报和视频连线仅能在无锡地区使用',
        confirmText: "确定",
        success: function (res) {
        }
      })
      //return;
    }

    if (this.data.alertAgreed == false) {
      this.doShowAlert()
      this.setData({
        alertType: 1,
        action: 1
      })
      return;
    }
    this.setData({
      alertAgreed: false
    })
    if (app.globalData.userInfo.isAuthenticated) {
      wx.navigateTo({
        url: '../report/report?address=' + this.data.address +
          '&longitude=' + this.data.longitude +
          '&latitude=' + this.data.latitude
      })
    }
    else {
      this.toVerify()
    }
  },
  GoToVideo: function () {
    if (this.data.showAlert == true) {
      return;
    }
    else if (this.data.city != "无锡市") {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '违法举报和视频连线仅能在无锡地区使用',
        confirmText: "确定",
        success: function (res) {
        }
      })
     // return;
    }
    if (this.data.alertAgreed == false) {
      this.doShowAlert()
      this.setData({
        alertType: 2,
        action: 2
      })
      return;
    }
    this.setData({
      alertAgreed: false
    })
    var that = this
    if (app.globalData.userInfo.isAuthenticated) {
      wx.showModal({
        title: '',
        content: '警方在需要了解现场情况时，会联系你，请注意接通。有急难险等危害人身、财产公共安全时请直接拨打110',
        confirmText: "继续连线",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.navigateTo({
              url: '../videoConnect/videoConnect?address=' + that.data.address +
                '&longitude=' + that.data.longitude +
                '&latitude=' + that.data.latitude
            })
          } else {
          }
        }
      })
    }
    else {
      this.toVerify()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'ETCBZ-5RV6X-Y764V-7JLA2-R7A43-ULFNR'
    });
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
    if (app.globalData.showTestAlert != "false") {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '无锡110目前正在测试中，不受理相关受理业务',
        confirmText: "确定",
        success: function (res) {
        }
      })
    }
    this.getLocation();
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
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude,
          address: res.result.address
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }
})

