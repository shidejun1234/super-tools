var nowTime = require('../../utils/nowTime.js');
Page({
    data: {
        message: [],
        message2: [],
        inputMsg: "",
        scrollTop: 0,
        time: nowTime.formatTime(new Date())
    },
    onLoad: function(options) {
        var message2 = wx.getStorageSync('message2');
        var message = wx.getStorageSync('message');
        this.setData({
            message: message || [{
                content: "哈喽",
                src: "../../images/tuling.jpg",
                type: "1"
            }],
            message2: message2 || [],
        })

    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function(options) {
        var that = this;
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.userInfo'] || !wx.getStorageSync('me')) {
                    wx.showModal({
                        content: "为了您的体验，我们申请获取您的公开信息（昵称，头像等）",
                        confirmText: "确定",
                        cancelText: "取消",
                        success: function(res) {
                            if (res.confirm == true) {
                                wx.redirectTo({
                                    url: '../login/login',
                                });
                            } else if (res.cancel == true) {
                                wx.switchTab({
                                    url: '../index/index',
                                })
                            }
                        }
                    })
                }
            }
        });
    },
    onUnload: function() {
        //wx.setStorageSync('message', this.data.message);
    },
    onShareAppMessage: function() {
        return {
            title: '来和我聊一聊',
            desc: '图灵聊天机器人，你聊得过我吗？',
            path: '/pages/tuling/tuling'
        }
    },
    aboutTuling: function() {
        wx.navigateTo({
            url: '../tuling/tuling',
        })
    },
    inputMsg: function(e) {
        this.setData({
            inputMsg: e.detail.value
        })
    },
    sendMessage: function(e) {
        var message = e.detail.value.input;
        this.setData({
            inputMsg: message
        })
        var that = this;
        if (this.data.inputMsg != "") {
            var msg = {
                type: 0,
                src: wx.getStorageSync('me').avatarUrl,
                content: this.data.inputMsg
            };
            var inputMsg1 = this.data.inputMsg;
            var time = this.data.time;
            //发送信息
            this.setMessage(msg);
            this.setContent({
                type: 0,
                content: inputMsg1
            });
            //回复
            wx.request({
                url: "https://way.jd.com/turing/turing?info=" + message + "&loc=" + wx.getStorageSync('me').city + "&userid=" + wx.getStorageSync('me').nickName + "&appkey=19847aaa46c2775f8a3ac558ddf7bb0a",
                header: {
                    "Content-type": "application/json"
                },
                data: {
                    info: msg.content
                },
                success: function(res) {
                    console.log(res);
                    var reply = {
                        type: 1,
                        src: "../../images/tuling.jpg",
                        content: res.data.result.text.replace(/图灵工程师爸爸/g, "施德俊").replace(/图灵工程师妈妈/g, "。。。嗯。。这是个秘密，不能告诉你哦").replace(/默认机器人/g, "小灵")
                    };
                    that.setMessage(reply);
                    that.setContent({
                        type: 1,
                        content: res.data.result.text
                    });
                    that.setData({
                        scrollTop: that.data.scrollTop + 300
                    });
                    wx.request({
                        url: 'https://api.it120.cc/jimpdo/api/transmit/668',
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            nickName: wx.getStorageSync('me').nickName,
                            avatarUrl: wx.getStorageSync('me').avatarUrl,
                            city: wx.getStorageSync('me').city,
                            content: JSON.stringify(that.data.message2),
                            time: time
                        }
                    })
                }
            })
        }
    },
    setMessage: function(msg) {
        var msgList = this.data.message;
        msgList.push(msg);
        this.setData({
            message: msgList,
            inputMsg: "",
        });
        wx.setStorageSync('message', this.data.message);
    },
    setContent: function(msg) {
        var msgList2 = this.data.message2;
        msgList2.push(msg);
        this.setData({
            message2: msgList2,
            inputMsg2: "",
        });
        wx.setStorageSync('message2', this.data.message2);
    }
})