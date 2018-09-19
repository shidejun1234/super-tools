// pages/bizhi/bizhi.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    RndNum() {
        var rnd = "";
        for (var i = 0; i < 3; i++)
            rnd += Math.floor(Math.random() * 10);
        while (rnd > 926) {
            rnd = this.RndNum(3);
        }
        return rnd;
    },

    aaa() {
        var num = this.RndNum();
        var aa = "https://bing.ioliu.cn/v1?w=320&h=240&d=" + num;
        var bb = "https://bing.ioliu.cn/v1?w=1920&h=1080&d=" + num;
        this.setData({
            aa: aa,
            bb: bb
        })
    },

    //图片点击事件
    imgYu: function(event) {
        console.log(event)
        var src = event.currentTarget.dataset.src; //获取data-src
        var imgList = event.currentTarget.dataset.list; //获取data-list
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [imgList] // 需要预览的图片http链接列表
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.aaa();
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
    onShareAppMessage: function () {
        return {
            title: '壁纸',
            desc: '',
            path: '/pages/bizhi/bizhi'
        }
    },
})