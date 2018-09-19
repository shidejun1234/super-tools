Page({
  data: {
    result: ''
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
          console.log(res.result);
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
      }
    })
  }
})
