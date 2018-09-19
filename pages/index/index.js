Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
        isSearch: true,
        columns: [{
            id: 1,
            img: "../../images/me.jpg",
            title: "生成二维码",
            url:"../qr-code/qr-code"
        }, {
            id: 2,
            img: "../../images/me.jpg",
                title: "识别二维码",
                url: "../scan-code/scan-code"
        }, {
            id: 3,
            img: "../../images/me.jpg",
                title: "和我聊一聊",
                url: "../tuling/tuling"
            }, {
                id: 4,
                img: "../../images/me.jpg",
                title: "壁纸",
                url: "../bizhi/bizhi"
            }, {
                id: 5,
                img: "../../images/me.jpg",
                title: "个税计算器",
                url: "../tax/tax"
            }, {
                id: 6,
                img: "../../images/me.jpg",
                title: "指南针",
                url: "../on-compass-change/on-compass-change"
            }, {
                id: 7,
                img: "../../images/me.jpg",
                title: "每日一文",
                url: "../one-article/one-article"
            },]
    },

    //产生随机数函数
    RndNum() {
        var rnd = "";
        for (var i = 0; i < 3; i++)
            rnd += Math.floor(Math.random() * 10);
        while (rnd > 926) {
            rnd = this.RndNum(3);
        }
        return rnd;
    },

    imageLoad: function(e) {
        var width = e.detail.width;
        var height = e.detail.height;
        this.setData({
            hig: 750 / (width / height)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            background: ['https://bing.ioliu.cn/v1?w=640&h=480&d=' + this.RndNum(), 'https://bing.ioliu.cn/v1?w=640&h=480&d=' + this.RndNum(), 'https://bing.ioliu.cn/v1?w=640&h=480&d=' + this.RndNum()],
        })
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