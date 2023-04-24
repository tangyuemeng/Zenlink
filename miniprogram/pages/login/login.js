// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    password:""
  },
  bindKeyInput: function (e) {
    if (e.currentTarget.dataset.key == "id"){
      this.id = e.detail.value
    }
    else{
      this.password = e.detail.value
    }
},
  login(){
    wx.navigateTo({
      url: '../../pages/home/home',
    })
  },  
})