
import uCharts from '../../components/qiun-wx-ucharts/u-charts.js';
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
var uChartsInstance = {};
Page({
  data: {
    cWidth: 0.74*wx.getSystemInfoSync().windowWidth,
    cHeight: 0.39*wx.getSystemInfoSync().windowWidth,
    res : {
      categories: ["4月","5月","6月","7月","8月","9月"],
      series: [
        {
          name: "营业额",
          data: [35,32,25,17,4,44]
        },
        {
          name: "成单量",
          data: [2,4,6,12,22,4]
        },
        {
          name: "客户数",
          data: [2,6,12,22,50,13]
        }
      ]
    }
  },
  onLoad(){
    wx.createSelectorQuery()
    .select('#AtiNjidjBEpKNViiLbQmVUlsSWihuAvN') 
    .node(({ node: canvas }) => {
        const ctx = canvas.getContext('2d')
        this.drawCharts('AtiNjidjBEpKNViiLbQmVUlsSWihuAvN', this.data.res,ctx);
    })
    .exec()
    let allSale = app.globalData.count +  app.globalData.uncount 
    let percent = allSale > 40 ? 100 : allSale/40 * 100
    let countwidth = allSale > 40 ? 80 : allSale/40*80
    this.setData({
      count : app.globalData.count,
      uncount : app.globalData.uncount,
      allSale : allSale,
      countwidth: countwidth,
      percent: percent
    })
  },
  onReady() {
  
  },
  drawCharts(id,data,ctx){
    uChartsInstance[id] = new uCharts({
        type: "line",
        context: ctx,
        width: this.data.cWidth,
        height: this.data.cHeight,
        categories: data.categories,
        series: data.series,
        animation: true,
        background: "#FFFFFF",
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,10,0,15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      });
  },
  tap(e){
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  },
  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
})