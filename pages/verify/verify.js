// pages/verify/verify.js
const urlList = require('../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSkip: true,
    idName: '',
    idNo: '',
    previousAction:0,

    mobile: '',
    smsCode: '',
    sendStatus: 0,
    second: 30,
    timer: null
  },
  idNameInput: function (e) {
    this.setData({
      idName: e.detail.value
    })
  },
  idNoInput: function (e) {
    this.setData({
      idNo: e.detail.value
    })
  },
  //事件处理函数
  CheckID: function () {
    var name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    if (!name.test(this.data.idName)) {
      wx.showToast({
        title: '请输入正确的中文姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var idNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (this.data.idNo == '') {
      wx.showToast({
        title: '身份证号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    else if (!idNo.test(this.data.idNo)) {
      wx.showToast({
        title: '身份证号码不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.checkMobile())
      return;
    if (this.data.smsCode.length != 4) {
      wx.showToast({
        title: '验证码长度有误！',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    var that = this
    wx.request({
      url: urlList.certificationUrl,
      data: {
        idname: this.data.idName,
        idno: this.data.idNo,
        token: app.globalData.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          app.globalData.userInfo.idName = that.data.idName
          app.globalData.userInfo.idNo = that.data.idNo

          //$$接口判断验证码是否正确
          wx.request({
            url: urlList.checkSmsCodeUrl,
            data: {
              mobile: that.data.mobile,
              code: that.data.smsCode,
              token: app.globalData.token
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res);
              if (res.data.code == 200) {
                app.globalData.userInfo.mobile = that.data.mobile;
                app.globalData.userInfo.isAuthenticated = true;
                wx.showToast({
                  title: '认证成功',
                  icon: 'none',
                  duration: 1000
                });
                setTimeout(function(){
                  wx.navigateBack({
                  })
                },1000)
                              } else {
                wx.showToast({
                  title: '手机验证失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          })
        } else {
          wx.showToast({
            title: '实名认证失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })


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
      this.setData({
        canSkip: false,
        previousAction: options.action
      })
    }
    else {
      this.setData({
        canSkip: true
      })
    }
    console.log(this.data.canSkip)
    wx.setNavigationBarTitle({
      title: '实名认证',
    })
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
                second: 30
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

