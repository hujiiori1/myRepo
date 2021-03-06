//获取应用实例
// pages/addMobile/addMobile.js
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    smsCode: '',
    sendStatus: 0,
    second: 30,
    timer: null
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  checkMobile: function () {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.mobile.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if (!myreg.test(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    return true;
  },
  checkVerifyCode: function () {
    if (!this.checkMobile())
      return;
    if (this.data.smsCode.length != 4) {
      wx.showToast({
        title: '验证码长度有误！',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    //$$接口判断验证码是否正确
    var that = this
    wx.request({
      url: urlList.checkSmsCodeUrl,
      data: {
        mobile: this.data.mobile,
        code: this.data.smsCode,
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          app.globalData.userInfo.mobile = that.data.mobile;
        } else {
          wx.showToast({
            title: '手机验证失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    }
    )
    var isVerified = "true";
    if (isVerified) {
      if (app.globalData.userInfo.isAuthenticated) {
        wx.navigateTo({
          url: '../main/main'
        });
      } else {
        wx.navigateTo({
          url: '../verify/verify'
        });
      }
    }
    else {
      //弹框
    }
  },
  sendCode: function () {
    if (this.sendStatus == 1)
      return;
    if (!this.checkMobile())
      return;
    var self = this
    wx.request({
      url: urlList.getSmsCodeUrl,
      data: {
        mobile: this.data.mobile,
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          self.setData({
            sendStatus: 1
          })
          self.data.timer = setInterval(function () {
            self.setData({
              second: self.data.second - 1
            })
            if (self.data.second <= 0) {
              clearInterval(self.data.timer)
              self.setData({
                sendStatus: 0,
                second:30
              })
            }
          }, 1000)
        } else {
          wx.showToast({
            title: '请求验证码失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    }
    )
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