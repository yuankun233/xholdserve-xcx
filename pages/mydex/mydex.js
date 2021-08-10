// pages/mydex/mydex.js
import fetch from '../../request/fetch';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    user: '',
    start: false,
    num: '',
    // show: false,
  },

  async random() {
    console.log('random');
    var _this = this;
    var res = await fetch({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/Random_num',
      data: {
        id: _this.__data__.user.id,
      },
    });
    console.log(res.data.data, '看下随机数');
    _this.setData({ num: res.data.data });
  },
  opinion() {
    console.log(111);
    wx.navigateTo({
      url: '/pages/ffff/ffff',
    });
  },
  async getUser() {
    var _this = this;
    console.log(_this.__data__, '看看数据');
    var res = await fetch({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/attend_info',
      data: {
        token: _this.__data__.info.token,
        id: _this.__data__.info.id,
      },
    });
    console.log(res.data.data, '用户信息');
    _this.setData({
      user: res.data.data,
      num: res.data.data.random_num,
    });
  },
  xh_out() {
    wx.clearStorage();
    wx.reLaunch({
      url: '/pages/login/login',
    });
  },
  clickJDRZ() {
    wx.navigateTo({
      url: '/pages/attestation/attestation',
    });
  },
  sendOrders() {
    // console.log(11111222);
    wx.navigateTo({
      url: '/pages/sendOrders/sendOrders?start=1',
    });
  },
  modification() {
    wx.navigateTo({
      url: '/pages/modification/modification',
    });
  },
  // 转跳审核
  audit() {
    wx.navigateTo({
      url: '/pages/audit/audit',
    });
  },
  Zorder() {
    wx.navigateTo({
      url: '/pages/sendOrders/sendOrders?start=2',
    });
  },
  GYWM() {
    var _this = this;
    _this.setData({
      start: true,
    });
  },
  GYWMX() {
    var _this = this;
    _this.setData({
      start: false,
    });
  },
  orderAll() {
    wx.navigateTo({
      url: '/pages/order_out/order_out',
    });
  },
  //zz
  xuazeFF() {
    wx.navigateTo({
      url: '/pages/vacation/vacation',
    });
  },
  xuazeLYGJ() {
    wx.navigateTo({
      url: '/pages/record/record',
    });
  },
  YJYJ() {
    // wx.
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'use',
      success(res) {
        console.log(res.data);
        _this.setData({
          info: res.data,
        });
        _this.getUser();
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
