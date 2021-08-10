// pages/login/login.js
import fetch from '../../request/fetch';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    input_CS: '',
    phone: '',
    password: '',
    none: '',
  },
  inputClick(e) {
    // console.log(e.currentTarget.dataset.id, '老子点了框');
    this.setData({
      input_CS: e.currentTarget.dataset.id,
    });
  },
  inputRk(e) {
    // console.log(e.currentTarget.dataset.id, '老子失去框');
    this.setData({
      input_CS: '',
    });
  },
  inputP(e) {
    // console.log(e.detail.value);
    this.setData({
      phone: e.detail.value,
    });
  },
  inputPW(e) {
    // console.log(e.detail.value, '密码');
    this.setData({
      password: e.detail.value,
    });
  },

  async login_1() {
    var _this = this;
    console.log(_this.__data__.phone);
    console.log(_this.__data__.password);
    //一定要写成this.data.isDisabled，不然判断出不来
    if (_this.data.none == '') {
      //当disabled=false时
      _this.setData({
        none: 'none', //修改isDisabled的值为true（即启用状态）
        //文字修改为“编辑”
      });
    } else {
      //当disabled=true时
      _this.setData({
        none: 1, //修改isDisabled的值为false（即禁用状态）
        //文字修改为“保存”
      });
    }
    var res = await fetch({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/do_login',
      data: {
        phone: _this.__data__.phone,
        password: _this.__data__.password,
        type: 1,
      },
    });

    console.log(res.data);
    if (res.data.code == 1) {
      wx.showToast({
        title: res.data.message,
      });
      _this.setData({
        none: true, //修改isDisabled的值为true（即启用状态）
        //文字修改为“编辑”
      });
    } else {
      wx.showToast({
        title: '登陆成功',
      });
      wx.setStorage({
        key: 'use',
        data: res.data.data,
      });
      wx.setStorage({
        key: 'token',
        data: res.data.data.token,
      });
      wx.setStorage({
        key: 'id_hly',
        data: res.data.data.id,
      });
      wx.reLaunch({
        url: '/pages/index/index',
      });
    }
  },
  userAgreementC() {
    wx.navigateTo({
      url: '/pages/fill/Fill',
    });
  },
  goWwww() {
    wx.redirectTo({
      url: '/pages/wwww/wwww',
    });
  },
  gozzzz() {
    wx.redirectTo({
      url: '/pages/zzzz/zzzz',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
