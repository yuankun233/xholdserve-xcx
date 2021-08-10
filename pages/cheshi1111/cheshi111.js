// pages/cheshi1111/cheshi111.js
// 引入插件安装器
import plugin from '../../src/component/v2/plugins/index';
// 设置代办
import todo from '../../src/component/v2/plugins/todo';
// 禁用/启用可选状态
import selectable from '../../src/component/v2/plugins/selectable';
// 农历相关功能
import solarLunar from '../../src/component/v2/plugins/solarLunar/index';
plugin.use(todo).use(solarLunar).use(selectable);
Page({
  doSometing() {
    // 获取日历组件上的 calendar 对象
    var _this = this;
    console.log(_this.selectComponent('#calendar'));
    const calendar = _this.selectComponent('#calendar').calendar;
    // 调用 calendar 对象上的方法
    // calendar.jump({ year: 2018, month: 6, date: 6 });
    const toSet = [
      {
        year: 2020,
        month: 11,
        date: 15,
      },
      {
        year: 2020,
        month: 11,
        date: 18,
      },
      {
        year: 2020,
        month: 10,
        date: 12,
      },
      {
        year: 2020,
        month: 11,
        date: 29,
      },
      {
        year: 2020,
        month: 12,
        date: 29,
      },
    ];
    calendar.setSelectedDates(toSet);
  },
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    _this.doSometing();
  },

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
