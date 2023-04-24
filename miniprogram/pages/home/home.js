// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  navigatePage(e){
    var url = '../'+e.currentTarget.dataset.page+'/'+e.currentTarget.dataset.page
    url = String(url)
    wx.navigateTo({
      url: url,
    })
  }
})