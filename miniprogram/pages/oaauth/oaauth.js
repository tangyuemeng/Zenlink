// pages/oaauth/oaauth.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    orderName:'',
    orderId:'',
    orderTime:'',
    orderPlatform:'',
    orderIntime:'',
    clientTime:'',
    clientFrom:'',
    clientFriend:'',
    clientFeason:'',
    AD:0,
    fee:0,
    array: [],
  },

  async onLoad(){
    wx.showLoading({
      title: '加载中',
    })
    let result = await db.collection('record').where({
      userID: app.globalData.userID
    }).get()
    let res = result.data
    let array = this.statusCheck(res)
    this.setData({
      array:array
    })
    wx.hideLoading()
  },

  statusCheck(e){
    e.forEach(obj => {
      if(obj.creditedTime) {
        obj.status = "finished"
      } else {
        if(obj.signatureTime) {
          obj.status = "signatured"
        } else {
          if(obj.approvedTime) {
            obj.status = "approved"
          } else {
            obj.status = "review"
          }
        }
      }
  })
  console.log(e)
  return e
  },

  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
})