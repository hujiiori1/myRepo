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
    idNo: ''
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
          app.globalData.userInfo.isAuthenticated = true
          app.globalData.userInfo.idName = that.data.idName
          app.globalData.userInfo.idNo = that.data.idNo
          wx.navigateTo({
            url: '../main/main'
          })
        } else {

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
        canSkip: false
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

