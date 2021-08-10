// pages/transfer/transfer.js
import fetch from '../../request/fetch';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: '',
  },
  async getInfo(id) {
    var _this = this;
    // console.log(_this);
    var res = await fetch({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/order/order_data',
      data: {
        id: id,
        token: _this.__data__.token,
      },
    });
    console.log(res, '111');

    _this.setData({
      info: res.data.data,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '我的订单id');
    var that = this;

    wx.getStorage({
      key: 'token',
      success(res) {
        that.setData({
          token: res.data,
        });
        that.getInfo(options.id);
      },
    });
  },
  changeHLY() {
    var _this = this;
    wx.setStorage({
      key: 'PDorderID',
      data: _this.__data__.info.id,
    });
    wx.navigateTo({
      url: '/pages/pppp/pppp',
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
