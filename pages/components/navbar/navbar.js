const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: wx.getSystemInfoSync()['statusBarHeight'],
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
  }

}) 