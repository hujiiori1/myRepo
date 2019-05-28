Page({
  tomine: function () {

    wx.switchTab({
      url: '../mine/mine',
    })
  },
  tomain: function () {
    wx.switchTab({
      url: '../alarm/alarm',
    })
  }
});