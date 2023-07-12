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
    app.globalData.mytotalsale = this.calculateTotalCount(app.globalData.mysale,this.data.currentmonth)

    let allSale = app.globalData.mytotalsale.toLocaleString()
    let countwidth = app.globalData.mytotalsale > 2000000 ? 80 : app.globalData.mytotalsale/2000000*80

    let allsalesorted = this.sortSale(app.globalData.allsale)
    console.log(allsalesorted)
    this.setData({
      allSale : allSale,
      countwidth: countwidth,
      allsalesorted:allsalesorted
    })
    wx.hideLoading()
  },

  calculateMonthCount(e,month){
    var mycount = 0
    e.forEach(obj => {
      if (obj.signatureTime){
        if (obj.signatureTime.getMonth()+1 == month){
          // 找到了当月的订单
          mycount +=  this.calculateCheck(obj.orderType, obj.AD+obj.fee, obj.discount, obj.repay)
        }
    }
    })
    return mycount
  },

  calculateTotalCount(e,month){
    var mycount = 0
    e.forEach(obj => {
      if (obj.signatureTime){
        if (obj.signatureTime.getMonth()+1 == month){
          // 找到了当月的订单
          mycount +=  this.calculateTotalCheck(obj.orderType, obj.AD+obj.fee, obj.discount, obj.repay)
        }
    }
    })
    return mycount
  },

  calculateCheck(e,count,discount,repay){
      if (e == "private"){
        return (count*0.9 - 10000)*0.6 - repay
      } 
      if (e == "public"){
        return (count*0.9 - 10000)*0.3 - repay
      }
      if (e == "company"){
        return (count*0.9 - 10000)*discount*0.6 - repay
      }
  },

  calculateTotalCheck(e,count,discount,repay){
    if (e == "company"){
      return count*discount - repay
    } else {
      return count - repay
    }
},

  // 获得已签约订单
  getSignatureSale(e){
    return e.filter(item => item.signatureTime)
  },

  sortSale(e){
    let signatureSale = this.getSignatureSale(e)
    let extractedData = signatureSale.map(obj => ({count: this.calculateTotalCheck(obj.orderType, obj.AD+obj.fee, obj.discount, obj.repay), userID: obj.userID}))
    let reducedArr = extractedData.reduce((accumulator, current) => {
      let found = accumulator.find(item => item.userID === current.userID);
      if (found) {
        found.count += current.count;
      } else {
        accumulator.push({ ...current });
      }
      return accumulator;
    }, []);
    reducedArr.sort((a, b) => b.count - a.count);
    return reducedArr
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