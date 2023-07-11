// pages/home/home.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentmonth : Number
  },

  async onLoad() {
    // let allSale = app.globalData.count +  app.globalData.uncount 
    // let countwidth = allSale > 40 ? 80 : allSale/40*80
    // this.setData({
    //   allSale : allSale,
    //   countwidth: countwidth
    // })
    wx.showLoading({
      title: '加载中',
    })
    let date = new Date()
    this.data.currentmonth = date.getMonth()+1

    let result = await db.collection('record').get()
    let res = result.data
    app.globalData.allsale = this.statusCheck(res)
    let result2 = await db.collection('record').where({
      userID: app.globalData.userID
    }).get()
    let res2 = result2.data
    app.globalData.mysale = this.statusCheck(res2)
    let mysale = this.calculateMonthCount(app.globalData.mysale,this.data.currentmonth)
    let allSale = mysale.toLocaleString()
    let countwidth = mysale > 2000000 ? 80 : mysale/2000000*80
    this.setData({
      allSale : allSale,
      countwidth: countwidth
    })
    wx.hideLoading()
  },

  calculateMonthCount(e,month){
    var mycount = 0
    e.forEach(obj => {
      if (obj.signatureTime){
        if (obj.signatureTime.getMonth()+1 == month){
          // 找到了当月的订单
          mycount +=  this.calculateCheck(obj.orderType, obj.AD+obj.fee)
        }
    }
    })
    return mycount
  },

  calculateCheck(e,count){
      if (e == "private"){
        return (count*0.9 - 10000)*0.6
      } 
      if (e == "public"){
        return (count*0.9 - 10000)*0.3
      }
      if (e == "company"){
        return (count*0.9 - 10000)*0.5*0.6
      }
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

  navigatePage(e){
    var url = '../'+e.currentTarget.dataset.page+'/'+e.currentTarget.dataset.page
    url = String(url)
    wx.navigateTo({
      url: url,
    })
  }
})