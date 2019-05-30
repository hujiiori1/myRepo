//app.js
const urlList = require('config.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //$$接口：请求后台获取用户信息（后台调用微信获取openid，并带上其他数据）
        wx.request({
          url: urlList.getUserInfoUrl,
          data: {
            jscode: res.code,
            type: '2'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res);
            if (res.data.code = 200) {
              that.globalData.userInfo = {
                userid:res.data.USER_ID, 
                mobile: res.data.MOBILE_NO, 
                isAuthenticated: res.data.ID_NO != '' && res.data.ID_NO!='null', 
                idName: res.data.ID_NAME,
                idNo:res.data.ID_NO,
                usersig:res.data.usersig
                };
              that.globalData.token = res.data.token;
              that.globalData.sdkappid=res.data.sdkappid;
              that.globalData.userInfo.isAuthenticated=false;//
            } else {

            }
          }
        })


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxUserInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    wxUserInfo: null,
    userInfo: [],
    token: null,
    sdkappid:null
  }
})