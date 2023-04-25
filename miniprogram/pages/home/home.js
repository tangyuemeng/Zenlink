// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     home : "black",
     setting : "darkblue"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  selectPage(e){
    if (e.currentTarget.dataset.page == "home"){
      this.setData({
        home:"black",
        setting : "darkblue"
      })
    }
    else{
      this.setData({
        home:"darkblue",
        setting : "black"
      })
    }
  },

  navigatePage(e){
    var url = '../'+e.currentTarget.dataset.page+'/'+e.currentTarget.dataset.page
    url = String(url)
    wx.navigateTo({
      url: url,
    })
  }
})