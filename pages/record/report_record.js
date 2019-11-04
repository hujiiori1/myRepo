const urlList = require('../../config.js');
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    reports: [],
    tabs: ["全部", "已处理", "未处理"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    page: 0,
    status: '',
    count: 10
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
        count: this.data.count,
        page: this.page,
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
  toDetail: function (e) {
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == '1') {
      this.setData({
        status: '1'
      })
    }
    else if (e.currentTarget.id == '2') {
      this.setData({
        status: '0'
      })
    }
    else if (e.currentTarget.id == '0') {
      this.setData({
        status: ''
      })
    }
    var that = this
    wx.request({
      url: urlList.getReportListUrl,
      data: {
        count: this.data.count,
        page: this.page,
        status: this.data.status,
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
      url: urlList.getReportListUrl,
      data: {
        count: this.data.count,
        page: this.data.page,
        status: this.data.status,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          reports: that.data.reports.concat(res.data.list)
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  }
});