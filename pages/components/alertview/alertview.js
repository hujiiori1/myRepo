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
    },
    hidden:{
      type:String,
      value:""
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

      this.triggerEvent('agree')
    }

  }
})
