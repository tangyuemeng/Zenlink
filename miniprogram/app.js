// app.js
App({
  globalData:{    
    isVIP : true,
    userID:null,
    num:0,
    allowedNum:0,
    cardtype:null,
    classtype:null,
    name:null,
    islogin:false,
    isTrail:false,
    pianonum:0,
    showmodel:false,
  }, 
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-7g6ho2ny7014f0ea',
      });
    }
    this.globalData = {};
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
});