const urlList = require('../../config.js');
const app = getApp();
Page({
  data: {
    events: [],
    markers: [],
    selectMarkerIndex: -1
  },
  onLoad: function (options) {
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        self.setData({
           latitude: res.latitude,
           longitude: res.longitude
         // latitude: "31.710000",
         // longitude: "120.520000"
        })
        const speed = res.speed
        const accuracy = res.accuracy
        wx.request({
          url: urlList.GetMapAllData,
          data: {
            token: app.globalData.token,
            lng: self.data.longitude,
            lat: self.data.latitude,
            zoom: 1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res);
            if (res.data.code == 200) {
              self.setData({
                events: res.data.event
              })
              var markers = [];
              for (var i = 0; i < res.data.event.length; i++) {
                markers.push({
                  id: res.data.event[i].eventId, iconPath: "../../imgs/map/lost_marker.png",
                  latitude: res.data.event[i].lat, longitude: res.data.event[i].lng,
                  width: 33, height: 43
                })
                self.setData({
                  markers: markers
                })
              }
            }
          }
        })
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    for (var i = 0; i < this.data.markers.length; i++) {
      if (this.data.markers[i].id == e.markerId) {
        this.setData({
          selectMarkerIndex: i
        })
      }
    }
  },
  controltap(e) {
    console.log(e.controlId)
  },
  takeCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.events[this.data.selectMarkerIndex].call
    })
  },
  touchstart: function () {
    if (this.data.selectMarkerIndex != -1) {
      this.setData({
        selectMarkerIndex: -1
      })
    }
  }

})