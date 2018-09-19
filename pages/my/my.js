// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: [{
            name: "手机信息",
            type: "primary",
            tap: "getSystemInfo"
        }, {
                name: "关于我们",
                tap: "about"
        }]
    },

    getSystemInfo: function() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                wx.setStorageSync('systemInfo', res);
                wx.getNetworkType({
                    success: function(res) {
                        wx.setStorageSync('networkType', res.networkType);
                        wx.navigateTo({
                            url: '../get-system-info/get-system-info',
                        })
                    }
                })
            }
        })
    },

    about(){
        wx.showModal({
            title: '关于我们',
            content: 'dejun',
            showCancel:false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var userInfo = wx.getStorageSync('me');
        if (userInfo) {
            this.setData({
                userInfo: userInfo,
                isLogin: true
            });
        }
    },

    onGotUserInfo: function(e) {
        console.log(e)
        if (e.detail.userInfo) {
            wx.setStorageSync('me', e.detail.userInfo);
            this.setData({
                userInfo: e.detail.userInfo,
                isLogin: true
            });
        }
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
        if (this.data.userInfo == undefined) {
            var userInfo = wx.getStorageSync('me');
            if (userInfo) {
                this.setData({
                    userInfo: userInfo,
                    isLogin: true
                });
            }
        }
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