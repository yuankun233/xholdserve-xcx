// pages/course/course.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
  },
  getBanner: function () {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/xcx/banner/get_list',
      method: 'post',
      data: {},
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        _this.setData({
          imgUrl: res.data.data.datalist,
        });
        if (res.data.code == 2) {
          wx.reLaunch({
            url: '/pages/home/login/login',
          });
        }
      },
    });
  },
  courseGAll() {
    console.log(111);
    wx.navigateTo({
      url: '/pages/AllCourse/AllCourse',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getBanner();
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
