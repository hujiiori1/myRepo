Page({
  data: {
    markers: [{
      iconPath: "../../imgs/map/lost_marker.png",
      id: 0,
      latitude: 31.53055,
      longitude: 120.40434,
      width: 33,
      height: 43
    },
    {
      iconPath: "../../imgs/map/lost_marker.png",
      id: 1,
      latitude: 31.56055,
      longitude: 120.38434,
      width: 33,
      height: 43
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  onLoad: function (options) {
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        self.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }

})