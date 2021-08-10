// pages/modification/modification.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 1, value: '男', checked: 'true' },
      { name: 2, value: '女' },
    ],
    sex: '1',
    name: '',
    age: '',
    address: '',
    id: '',
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var _this = this;
    _this.setData({
      sex: e.detail.value,
    });
  },
  MMaddress: function (e) {
    console.log(111);
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      address: e.detail.value,
    });
  },
  MMname: function (e) {
    console.log(111);
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      name: e.detail.value,
    });
  },
  MMage: function (e) {
    console.log(111);
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      age: e.detail.value,
    });
  },
  MMphone: function (e) {
    console.log(111);
    console.log(e.detail.value);
    var _this = this;
    _this.setData({
      phone: e.detail.value,
    });
  },
  buttonUp() {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/attend_action',
      method: 'post',
      data: {
        sex: _this.__data__.sex,
        age: _this.__data__.age,
        address: _this.__data__.address,
        name: _this.__data__.name,
        id: _this.__data__.id,
        type: 1,
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改个人资料成功',
          });
          wx.reLaunch({
            url: '/pages/mydex/mydex',
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'id_hly',
      success(res) {
        console.log(res.data);
        _this.setData({
          id: res.data,
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
