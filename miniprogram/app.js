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
    mysale:[],
    allsale:[]
  }, 
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'zenlink-2g43zf3r5f2eb1e8',
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
