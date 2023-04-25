// pages/userinfo/userinfo.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad(){
    let date = String(app.globalData.date.getFullYear())+ '-' + String(app.globalData.date.getMonth()) + '-' + String(app.globalData.date.getDate())
    this.setData({
      userID: app.globalData.userID,
      sex: app.globalData.sex,
      name: app.globalData.name,
      route: app.globalData.route,
      date: date,
      position: app.globalData.position,
    })
  },

  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
})