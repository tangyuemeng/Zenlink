// pages/login/login.js
//ZL123456
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:"",
    password:""
  },
  bindKeyInput: function (e) {
    if (e.currentTarget.dataset.key == "id"){
      this.userID = e.detail.value
    }
    else{
      this.password = e.detail.value
    }
},
  async login(){
    if (this.password && this.userID){
      let result = await db.collection('user').where({
        userID:this.userID
      }).get()
      let res = result.data
      if (res.length == 0) {
        wx.showToast({
          icon: 'error',
          title: '该工号不存在',
        })
        return
      }
      else {
        if (res[0].password == this.password){
          app.globalData.userID = res[0].userID
          app.globalData.sex = res[0].sex
          app.globalData.name = res[0].name
          app.globalData.route = res[0].route
          app.globalData.date = res[0].date
          app.globalData.position = res[0].position
          app.globalData.uncount = res[0].uncount
          app.globalData.count = res[0].count
          wx.showToast({
            icon: 'success',
            title: '登陆成功',
          })
          wx.navigateTo({
            url: '../../pages/home/home',
          })
        } else{
          wx.showToast({
            icon: 'error',
            title: '密码错误',
          })
          return
        }
      }
    } else {
      wx.showToast({
        icon: 'error',
        title: '请输入工号密码',
      })
    }
  },  
})