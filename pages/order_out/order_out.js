// pages/order_out/order_out.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    info: '',
  },
  getList() {
    var _this = this;
    console.log(_this, '我');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/admin/Order/order_index',
      method: 'post',
      data: {
        user_token: _this.__data__.user.user_token,
      },
      success(res) {
        console.log(res);
        _this.setData({
          info: res.data.data.datalist,
        });
      },
    });
  },
  paiDan(e) {
    var _this = this;
    console.log(this);
    console.log(e.currentTarget.dataset.ddid);
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/admin/Order/order_station',
      method: 'post',
      data: {
        id: e.currentTarget.dataset.ddid,
        nursing_id: _this.__data__.user.nursing_id,
        user_token: _this.__data__.user.user_token,
      },
      success(res) {
        console.log(res, '派单');
        wx.showToast({
          title: '成功',
          duration: 2000,
        });
        console.log('2222213123123');
        wx.reLaunch({
          url: '/pages/mydex/mydex',
        });
      },
    });
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
          user: res.data,
        });
        _this.getList();
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
