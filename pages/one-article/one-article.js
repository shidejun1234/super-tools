var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0
    },

    getArticle(that) {
        wx.request({
            url: 'https://interface.meiriyiwen.com/article/random?dev=1',
            success: (res) => {
                that.setData({
                    oneArticle: res.data.data
                })
                var article = res.data.data.content.replace(/<p>/g, "<p style='text-indent:2em'>")
                WxParse.wxParse('article', 'html', article, that, 5);
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getArticle(this);
    },

    next() {
        this.getArticle(this);
        this.setData({
            scrollTop: 0
        })
        console.log(this.data.topNum)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})