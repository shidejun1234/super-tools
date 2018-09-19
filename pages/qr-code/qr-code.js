var QRCode = require('../../utils/weapp-qrcode.js')

var qrcode;

Page({
    data: {
        text: '',
        image: ''
    },
    onLoad: function(options) {
        qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: "",
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    },
    confirmHandler: function(e) {
        var value = e.detail.value
        qrcode.makeCode(value)
    },
    inputHandler: function(e) {
        var value = e.detail.value
        this.setData({
            text: value
        })
    },
    tapHandler: function() {
        // 传入字符串生成qrcode
        qrcode.makeCode(this.data.text)
    },
    save: function(e) {
        console.log(e);
        var that = this
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function(res) {
                if (res.tapIndex == 0) {
                    qrcode.exportImage(function(path) {
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                            success(res) {
                                wx.showModal({
                                    content: '图片已保存到相册，赶紧晒一下吧~',
                                    showCancel: false,
                                    confirmText: '好的',
                                    confirmColor: '#333',
                                    success: function(res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定'); /* 该隐藏的隐藏 */
                                            that.setData({
                                                hidden: true
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
            }
        })
    }
})