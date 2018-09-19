// pages/adesk/adesk.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current_scroll: 'tab1',
        isBottom:true,
        page:1
    },

    RndNum() {
        var rnd = "";
        for (var i = 0; i < 3; i++)
            rnd += Math.floor(Math.random() * 10);
        while (rnd > 926) {
            rnd = this.RndNum(3);
        }
        return rnd;
    },

    //图片点击事件
    imgYu: function(event) {
        var src = event.currentTarget.dataset.src; //获取data-src
        var imgList = event.currentTarget.dataset.list; //获取data-list
        //图片预览
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [imgList] // 需要预览的图片http链接列表
        })
    },

    handleChangeScroll({
        detail
    }) {
        wx.showLoading({
            title: '玩命加载中',
        })
        this.setData({
            scrollTop: 0
        })
        var rndnum = this.RndNum();
        this.setData({
            current_scroll: detail.key,
            page: rndnum
        });
        if (detail.key == "tab1") {
            wx.request({
                url: 'https://api.it120.cc/jimpdo/api/transmit/676',
                data: {
                    limit: 20,
                    skip: rndnum,
                    adult: false,
                    first: 1,
                    order: 'hot'
                },
                success: (res) => {
                    this.setData({
                        imageList: res.data.data.res.vertical
                    })
                    wx.hideLoading();
                }
            });
        } else {
            wx.request({
                url: 'https://api.it120.cc/jimpdo/api/transmit/679',
                data: {
                    category: detail.key,
                    skip: rndnum
                },
                success: (res) => {
                    this.setData({
                        imageList: res.data.data.res.vertical
                    })
                    wx.hideLoading();
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that=this;
        wx.showLoading({
            title: '玩命加载中',
        })
        var rndnum = that.RndNum();
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/677',
            success: (res) => {
                this.setData({
                    categoryList: res.data.data.res.category
                })
            }
        })
        wx.request({
            url: 'https://api.it120.cc/jimpdo/api/transmit/676',
            data: {
                limit: 20,
                skip: rndnum,
                adult: false,
                first: 1,
                order: 'hot'
            },
            success: (res) => {
                this.setData({
                    imageList: res.data.data.res.vertical,
                    page:rndnum
                })
                wx.hideLoading();
            }
        });
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
    lower: function() {
        var that = this;
        if (that.data.isBottom == true) {
            var imageList = that.data.imageList;
            var page=that.data.page;
            page = Number(page) +20;
            if (that.data.current_scroll == "tab1") {
                wx.request({
                    url: 'https://api.it120.cc/jimpdo/api/transmit/676',
                    data: {
                        limit: 20,
                        skip: page,
                        adult: false,
                        first: 1,
                        order: 'hot'
                    },
                    success: (res) => {
                        for (var i = 0; i < res.data.data.res.vertical.length; i++) {
                            imageList.push(res.data.data.res.vertical[i]);
                        }
                        this.setData({
                            imageList: imageList
                        })
                        wx.hideLoading();
                    }
                });
            } else {
                wx.request({
                    url: 'https://api.it120.cc/jimpdo/api/transmit/679',
                    data: {
                        category: that.data.current_scroll,
                        skip: page
                    },
                    success: (res) => {
                        for (var i = 0; i < res.data.data.res.vertical.length; i++) {
                            imageList.push(res.data.data.res.vertical[i]);
                        }
                        this.setData({
                            imageList: imageList
                        })
                        wx.hideLoading();
                    }
                })
            }
            that.data.page = page;
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})