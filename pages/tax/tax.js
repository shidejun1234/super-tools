// pages/tax/tax.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        taxBegin: 3500
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    taxBegin(e) {
        var that = this;
        wx.showActionSheet({
            itemList: ['起征点', '3500（本地）', '4800（外籍及港、澳、台）'],
            success: function(res) {
                switch (res.tapIndex) {
                    case 1:
                        that.setData({
                            taxBegin: 3500
                        });
                        break;
                    case 2:
                        that.setData({
                            taxBegin: 4800
                        });
                        break;
                }
            }
        })
    },

    taxSubmit(e) {
        let revenue = e.detail.value.revenue;
        let taxSocial = e.detail.value.taxSocial;
        if (revenue == "") {
            wx.showToast({
                title: '请输入税前收入!',
                icon: 'none'
            })
            this.setData({
                result: []
            })
            return;
        }
        if (revenue != Number(revenue)) {
            wx.showToast({
                title: '请输入数字!',
                icon: 'none'
            })
            this.setData({
                result: []
            })
            return;
        }
        let suodee = revenue - taxSocial - this.data.taxBegin
        console.log(suodee)
        if (suodee < 0) {
            wx.showToast({
                title: '您无需缴纳个人所得税!',
                icon: 'none'
            })
            this.setData({
                result: []
            })
            return;
        }
        let rate;
        let qnum;
        if (suodee < 1500) {
            rate = 0.03;
            qnum = 0;
        } else if (suodee <= 4500) {
            rate = 0.1;
            qnum = 105;
        } else if (suodee <= 9 * 1000) {
            rate = 0.2;
            qnum = 555;
        } else if (suodee <= 35 * 1000) {
            rate = 0.25;
            qnum = 1005;
        } else if (suodee <= 55 * 1000) {
            rate = 0.3;
            qnum = 2755;
        } else if (suodee <= 80 * 1000) {
            rate = 0.35;
            qnum = 5505;
        } else {
            rate = 0.45;
            qnum = 13505;
        }
        let shuie = Math.floor((suodee * rate - qnum) * 100) / 100
        let total = (revenue - taxSocial - shuie).toFixed(2);
        wx.showToast({
            title: `实发工资：${total}元`,
            icon: 'none',
            duration: 2000
        })
        this.setData({
            result: [{
                key: "应纳税所得额",
                value: suodee + "元"
            }, {
                key: "适用税率",
                value: rate * 100 + "%"
            }, {
                key: "速算扣除数",
                value: qnum
            }, {
                key: "应缴税款",
                value: shuie + "元"
            }, {
                key: "实发工资",
                value: total + "元"
            }]
        })
    },

    isTaxSocial(){
        this.setData({
            isTaxSocial:true
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