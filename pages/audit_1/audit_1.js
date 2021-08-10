// pages/audit_1/audit_1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    info: '',
  },

  buttom_F() {
    console.log('111');
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_audit',
      method: 'post',
      data: {
        id: _this.__data__.info.id,
        status: 1,
        user_token: _this.__data__.user.user_token,
      },
      success(res) {
        wx.showToast({
          title: 'ok',
          icon: 'success',
          duration: 2000,
        });
        wx.reLaunch({
          url: '/pages/audit/audit',
        });
      },
    });
  },
  buttom_T() {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_audit',
      method: 'post',
      data: {
        id: _this.__data__.info.id,
        status: 3,
        user_token: _this.__data__.user.user_token,
      },
      success(res) {
        wx.showToast({
          title: 'ok',
          icon: 'success',
          duration: 2000,
        });
        wx.reLaunch({
          url: '/pages/audit/audit',
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var _this = this;
    wx.getStorage({
      key: 'use',
      success(res) {
        console.log(res.data);
        _this.setData({
          user: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_info',
          method: 'post',
          data: {
            id: options.id,
            user_token: _this.__data__.user.user_token,
          },
          success(res) {
            _this.setData({
              info: res.data.data,
            });
          },
        });
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
