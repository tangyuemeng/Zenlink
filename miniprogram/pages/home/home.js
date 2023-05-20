// pages/home/home.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
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
  onLoad() {
    let allSale = app.globalData.count +  app.globalData.uncount 
    let countwidth = allSale > 40 ? 80 : allSale/40*80
    this.setData({
      allSale : allSale,
      countwidth: countwidth
    })
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