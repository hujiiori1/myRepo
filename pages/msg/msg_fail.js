Page({
  back: function () {

    wx.navigateBack({

    })
  },
  tomain:function(){
    wx.switchTab({
      url: '../alarm/alarm',
    })
  }
});