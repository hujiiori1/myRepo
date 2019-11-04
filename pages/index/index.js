//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: '无锡市公安局',
    wxUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    //   if (app.globalData.userInfo.mobile == "") {
    //     wx.navigateTo({
    //       url: '../addMobile/addMobile'
    //    });
    //   } else {
    wx.navigateTo({
      url: '../main/main'
    });
    // }
  },
  onLoad: function () {
    if (app.globalData.wxUserInfo) {
      this.setData({
        wxUserInfo: app.globalData.wxUserInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          wxUserInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          this.setData({
            wxUserInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
 * Lifecycle function--Called when page show
 */
  onShow: function () {

    var that = this;
    console.log(app.globalData.wxUserInfo)
    var timer = setInterval(function () {
      console.log(app.globalData.skipLogin)
      if (app.globalData.skipLogin == true) {
        clearInterval(timer);
        wx.navigateTo({
          url: '../main/main'
        });
        return;
      }
      if (typeof (app.globalData.userInfo.userid) != "undefined" &&
        app.globalData.wxUserInfo != null) {
        clearInterval(timer);
        that.bindViewTap();
      }
    }, 1000);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.wxUserInfo = e.detail.userInfo
    this.setData({
      wxUserInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})