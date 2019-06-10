const app = getApp()
Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
    hidden: {
      type: String,
      value: false,
    },
    hideBack: {
      type: String,
      value: false,
    },
    hideHome: {
      type: String,
      value: false,
    }
  },
  data: {
    height: wx.getSystemInfoSync()['statusBarHeight'] + 46,
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    _navhome() {
      wx.navigateTo({
        url: '../../pages/main/main',
      })
    },
  }

}) 