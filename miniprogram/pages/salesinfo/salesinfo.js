
import uCharts from '../../components/qiun-wx-ucharts/u-charts.js';
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
var uChartsInstance = {};
Page({
  data: {
    array: ['1月', '2月', '3月', '4月','5月', '6月', '7月','8月', '9月','10月', '11月', '12月'],
    currentmonth : Number,
    index:0,
    percent:Number,
    cWidth: 0.78*wx.getSystemInfoSync().windowWidth,
    cHeight: 0.4*wx.getSystemInfoSync().windowWidth,
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
      ]
    }
  },
  onLoad(){
    wx.showLoading({
      title: '加载中',
    })
    let countwidth = app.globalData.mytotalsale > 2000000 ? 80 : app.globalData.mytotalsale/2000000*80
    let percent = app.globalData.mytotalsale/2000000*100
    this.data.percent = percent
    let date = new Date()
    // 图表坐标
    this.data.currentmonth = date.getMonth()+1
    let currentmonth = this.data.currentmonth
    let months = this.data.array.slice(currentmonth-6, currentmonth)
    this.data.res.categories = months
    // 图表数值
    let CountArray = this.getCountArray()
    this.data.res.series[0].data = CountArray[1]
    this.data.res.series[1].data = CountArray[0]
    //
    let count = this.calculateMonthCount(app.globalData.mysale, this.data.currentmonth)
    let creditedsale = this.getCreditedeSale(app.globalData.mysale)
    let creditedmonthcount = this.calculateMonthCount(creditedsale,this.data.currentmonth)
    let uncredited = count - creditedmonthcount

    wx.createSelectorQuery()
    .select('#AtiNjidjBEpKNViiLbQmVUlsSWihuAvN') 
    .node(({ node: canvas }) => {
        const ctx = canvas.getContext('2d')
        this.drawCharts('AtiNjidjBEpKNViiLbQmVUlsSWihuAvN', this.data.res, ctx);
    })
    .exec()
    this.setData({
      count : count,
      uncount: uncredited,
      countwidth: countwidth,
      percent: percent,
      index: currentmonth - 1,
    })
    wx.hideLoading()
  },

  bindPickerChange: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    let month = Number(e.detail.value) + 1
    let count = this.calculateMonthCount(app.globalData.mysale, month)
    let creditedsale = this.getCreditedeSale(app.globalData.mysale)
    let creditedmonthcount = this.calculateMonthCount(creditedsale,month)
    let uncredited = count - creditedmonthcount
    let countwidth = count > 2000000 ? 80 : count/2000000*80
    let percent = count/2000000*100
    this.setData({
      count : count,
      uncount: uncredited,
      countwidth: countwidth,
      percent: percent,
      index : e.detail.value
    })
    wx.hideLoading()
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

  calculateMonthCount(e,month){
    var mycount = 0
    e.forEach(obj => {
      if (obj.signatureTime){
        if (obj.signatureTime.getMonth()+1 == month){
          // 找到了当月的订单
          mycount +=  this.calculateCheck(obj.orderType, obj.AD+obj.fee, obj.discount, obj.repay, this.data.percent)
          console.log(mycount)
        }
        else{
          console.error();
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

  calculateCheck(e,count,discount,repay,kpi){
      var bonus = 0
      if (kpi >= 100){
        bonus = 0.1
      } 
      if (e == "private"){
        return (count*0.9 - 10000)*(0.6 + bonus) - repay
      } 
      if (e == "public"){
        return (count*0.9 - 10000)*(0.3+ bonus) - repay
      }
      if (e == "company"){
        return (count*0.9 - 10000)*discount*(0.6+ bonus) - repay
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

  // 获得已入账订单
  getCreditedeSale(e){
    return e.filter(item => item.creditedTime)
  },

  // 获得月订单
  getMonthSale(e,month){
      return e.filter(item => item.signatureTime && item.signatureTime.getMonth()+1 == month)
  },

  getCountArray(){
    var monthArray = []
    var countArray = []
    let creditedsale = this.getCreditedeSale(app.globalData.mysale)
      for(let i = this.data.currentmonth - 5 ; i <= this.data.currentmonth ; i++) {
        let monthsale = this.getMonthSale(creditedsale,i)
        monthArray.push(monthsale.length)
        let monthcount = this.calculateMonthCount(creditedsale,i)
        countArray.push(monthcount)
      }
      return [monthArray,countArray]
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
  
  naviback(){
    wx.navigateBack({
      delta:1
    })
  }
})