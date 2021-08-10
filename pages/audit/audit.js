// pages/audit/audit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    SHinfo: '',
  },
  getList() {
    var _this = this;
    console.log(_this);
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_list',
      method: 'post',
      data: {
        nursing_id: _this.__data__.user.nursing_id,
        user_token: _this.__data__.user.user_token,
        status: 2,
      },
      success(res) {
        console.log(res.data.data.datalist, '111');
        _this.setData({
          SHinfo: res.data.data.datalist,
        });
      },
    });
  },
  butt(e) {
    console.log(e.currentTarget.dataset.id, 'kankan');
    wx.navigateTo({
      url: `/pages/audit_1/audit_1?id=${e.currentTarget.dataset.id}`,
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
