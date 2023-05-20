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
    let result = await db.collection('admin').get()
    let res = result.data
    let resarray = []
    for (var i = 0;i < res.length; i++ ){
      resarray.push(res[i].name)
    }
    this.setData({
      array:resarray
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  orderName: function (e) {
    this.setData({
      orderName: e.detail.value
    })
    },
  orderId: function (e) {
    this.setData({
      orderId: e.detail.value
    })
    },    
  orderTime: function (e) {
    this.setData({
      orderTime: e.detail.value
    })
    },
    orderPlatform: function (e) {
    this.setData({
      orderPlatform: e.detail.value
    })
    },
    orderIntime: function (e) {
    this.setData({
      orderIntime: e.detail.value
    })
    },
    clientTime: function (e) {
    this.setData({
      clientTime: e.detail.value
    })
    },
    clientFrom: function (e) {
    this.setData({
      clientFrom: e.detail.value
    })
    },
    clientFriend: function (e) {
    this.setData({
      clientFriend: e.detail.value
    })
    },
    clientFeason: function (e) {
      this.setData({
        clientFeason: e.detail.value
      })
      },
  AD: function (e) {
    this.setData({
      AD: e.detail.value
    })
    },
  fee: function (e) {
    this.setData({
      fee: e.detail.value
    })
    },
   
  upload(){
    console.log(this.data.orderName)
    if(this.data.orderName && this.data.fee && this.data.AD && this.data.clientFeason && this.data.clientFriend && this.data.clientFrom && this.data.clientTime && this.data.orderIntime && this.data.orderPlatform && this.data.orderTime && this.data.orderId ){
      db.collection('oauth').add({
        data : {
          'orderName':this.data.orderName,
          'fee':this.data.fee,
          'AD':this.data.AD,
          'clientFeason':this.data.clientFeason,
          'clientFriend':this.data.clientFriend,
          'clientFrom':this.data.clientFrom,
          'clientTime':this.data.clientTime,
          'orderIntime':this.data.orderIntime,
          'orderPlatform':this.data.orderPlatform,
          'orderId':this.data.orderId,
          'orderTime':this.data.orderTime,
          'userID':app.globalData.userID
        }
      })
    } else {
      wx.showToast({
        icon:'error',
        title: '请输入完整信息',
      })
    }
  },

  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
})