// pages/pppp/pppp.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    use: '',
    HLZ: '',
    nurse: [],
    page: 1,
    day: '',
    PDorderID: '',
    HLYid: '',
  },
  getAttend_list() {
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_list',
      method: 'post',
      data: {
        type: id,
        nid: nid,
        user_token: _this.__data__.hlzArray[0].user_token,
      },
      success(res) {
        console.log(res, '测试');
        _this.setData({
          info: res.data.data.datalist,
        });
      },
    });
  },
  TextDay(e) {
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      day: e.detail.value,
    });
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function (e) {
    var _this = this;
    console.log(e.currentTarget.dataset.hlyid, '看下');
    _this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    });
    _this.setData({
      HLYid: e.currentTarget.dataset.hlyid,
    });
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    });
    console.log('不缺');
  },
  //确认
  confirm: function () {
    var _this = this;
    this.setData({
      hiddenmodalput: true,
    });
    console.log('缺');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/order/order_send',
      method: 'post',
      data: {
        attend_id: _this.__data__.HLYid, //护理员
        id: _this.__data__.PDorderID, //订单id
        nursing_id: _this.__data__.HLZ.nid, //护理站id
        user_token: _this.__data__.HLZ.user_token,
        length_service: _this.__data__.day,
      },
      success(res) {
        console.log(res, '派单成功');
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 3000,
        });
        wx.reLaunch({
          url: '/pages/sendOrders/sendOrders',
        });
      },
    });
  },
  getNursing() {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/attend/attend_list',
      data: {
        user_token: _this.__data__.HLZ.user_token,
        nursing_id: _this.__data__.HLZ.nid,
        // page_size: 5,
      },
      success(res) {
        console.log(res, '看看');
        _this.setData({
          nurse: res.data.data.datalist,
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
          use: res.data,
        });
      },
    });
    wx.getStorage({
      key: 'PDorderID',
      success(res) {
        console.log(res.data);
        _this.setData({
          PDorderID: res.data,
        });
      },
    });
    wx.getStorage({
      key: 'HLZ',
      success(res) {
        console.log(res.data);
        _this.setData({
          HLZ: res.data,
        });
        _this.getNursing();
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
