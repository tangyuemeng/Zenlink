// app.js


App({
  globalData:{    
    userID:'',
    password:'',
    sex:'',
    name:'',
    route:'',
    date:Date(),
    position:'',
    count:0,
    uncount:0,
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
