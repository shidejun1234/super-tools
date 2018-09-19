Page({
    data: {
        systemInfo: {}
    },
    onLoad() {
        this.setData({
            systemInfo: wx.getStorageSync('systemInfo'),
            networkType: wx.getStorageSync('networkType')
        })
    }
})