// pages/components/alertview/alertview.js
Component({
  /**
   * Component properties
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    content: {
      type: String,
      value: "内容"
    }
  },
  /**
   * Component initial data
   */
  data: {
    agreed: false
  },
/**
   * Component methods
   */
  methods: {
    agree: function () {
      this.setData({
        agreed: true
      })
    }

  }
})
