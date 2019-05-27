// pages/report/report.js
const urlList = require('../../config.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    reporterName: '',
    reporterMobile: '',
    reportContent: '',
    eventLocation: [],
    currentLocation: [],
    pics: [],
    video: ''
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pics: that.data.pics.concat(res.tempFilePaths)
        });
      }
    })
  },
  chooseVideo: function (e) {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          video: res.tempFilePath
        });
      }
    })
  },
  chooseEventLocation: function (e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          eventLocation: res
        })

      },
    })
  },
  chooseCurrentLocation: function (e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          currentLocation: res
        })
      },
    })
  },
  reporterNameInput: function (e) {
    this.setData({
      reporterName: e.detail.value
    })
  },
  reporterMobileNoInput: function (e) {
    this.setData({
      reporterMobile: e.detail.value
    })
  },
  reportContentInput: function (e) {
    this.setData({
      reportContent: e.detail.value
    })
  },
  submitReport: function (e) {
    var name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    if (!name.test(this.data.reporterName)) {
      wx.showToast({
        title: '请输入正确的中文姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.reporterMobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (this.data.reportContent == '') {
      wx.showToast({
        title: '举报内容不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (this.data.eventLocation.length == 0) {
      wx.showToast({
        title: '事发位置不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (this.data.currentLocation.length == 0) {
      wx.showToast({
        title: '所在位置不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    if (this.data.pics.length > 0 || this.data.video != '') {
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })
    }
    var files = []
    for (i = 0; i < this.data.pics.length; i++) {
      files.push({ type: "pic", path: this.data.pics[i], key: "" })
    }
    if (this.data.video != "") {
      files.push({ type: "video", path: this.data.video, key: "" })
    }
    var that = this
    var uploadCount = 0;
    for (var i = 0; i < files.length; i++) {
      console.log(files[i].path)
      wx.uploadFile({
        url: urlList.uploadFileUrl,
        filePath: files[i].path,
        name: "attachment[]",
        formData: {
          'index': i
        },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          console.log(res)
          uploadCount++
          files[parseInt(JSON.parse(res.data).post.index)].key = JSON.parse(res.data).list[0]
          if (uploadCount == files.length) {
            var picKeys = []
            var videoKeys = []
            for (var i = 0; i < files.length; i++) {
              if (files[i].type == 'pic') {
                picKeys.push(files[i].key)
              }
              else if (files[i].type == 'video') {
                videoKeys.push(files[i].key)
              }
            }
            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
            //$$接口提交report
            wx.request({
              url: urlList.submitReportUrl,
              method:"POST",
              data: {
                reporter_name: that.data.reporterName,
                reporter_mobile: that.data.reporterMobile,
                content: that.data.reportContent,
                img_attachment: picKeys,
                video_attachment: videoKeys,
                event_name: that.data.eventLocation.name,
                event_address: that.data.eventLocation.address,
                event_lng: that.data.eventLocation.longitude,
                event_lat: that.data.eventLocation.latitude,
                curr_name: that.data.currentLocation.name,
                curr_address: that.data.currentLocation.address,
                curr_lng: that.data.currentLocation.longitude,
                curr_lat: that.data.currentLocation.latitude,
                token: app.globalData.token
              },
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success(res) {
                console.log(res);
                if (res.data.code == 200) {
                  wx.navigateTo({
                    url: '../msg/msg_success',
                  })
                } else {
                  wx.navigateTo({
                    url: '../msg/msg_fail',
                  })
                }
              },
              fail(res) {
                wx.navigateTo({
                  url: '../msg/msg_fail',
                })
              }
            })
          }

        },
        fail: function (res) {
          wx.hideToast();
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            showCancel: false,
            success: function (res) { }
          })
        }
      })
    }

  },
  deleteImg: function (e) {
    var pics = this.data.pics;
    var itemIndex = e.currentTarget.dataset.id;
    pics.splice(itemIndex, 1);
    this.setData({
      pics: pics
    })
  },
  deleteVideo: function (e) {
    this.setData({
      video: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      reporterName: app.globalData.userInfo.idName,
      reporterMobile: app.globalData.userInfo.mobile
    })
    wx.setNavigationBarTitle({
      title: '违法犯罪举报',
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

  }
})