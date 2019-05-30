const urlList = require('../../config.js');
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    reports: [],
    tabs: ["全部", "已处理", "未处理"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    var that = this;
    wx.request({
      url: urlList.getReportListUrl,
      data: {
        count: 10,
        page: 0,
        token: app.globalData.token
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            reports: res.data.list
          })
        }
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var status = ''
    if (e.currentTarget.id == '1') {
      status = '1'
    }
    else if (e.currentTarget.id == '2') {
      status = '0'
    }
    var that = this
    wx.request({
      url: urlList.getReportListUrl,
      data: {
        count: 10,
        page: 0,
        status:status,
        token: app.globalData.token
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          that.setData({
            reports: res.data.list
          })
        }
      }
    })
  }
});