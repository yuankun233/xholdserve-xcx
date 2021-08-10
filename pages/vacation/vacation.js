// pages/vacation/vacation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    list: [],
    list_1: [],
    // 编辑
    BJ: 1,
    // 选择日期_下标
    day: 7,
    // 时间段后台
    timeD: '',
    // 时间段静态
    timeJJ: [
      {
        time: '05:00',
      },
      {
        time: '06:30',
      },
      {
        time: '08:00',
      },
      {
        time: '09:30',
      },
      {
        time: '11:00',
      },
      {
        time: '12:30',
      },
      {
        time: '14:00',
      },
      {
        time: '15:30',
      },
      {
        time: '17:00',
      },
      {
        time: '18:30',
      },
      {
        time: '20:00',
      },
      {
        time: '21:30',
      },
    ],
  },
  getTime(n) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    console.log(date);
    if (day !== 0) {
      n = n + (day - 1);
    } else {
      n = n + day;
    }
    if (day) {
      if (month > 1) {
        month = month;
      } else {
        year = year - 1;
        month = 12;
      }
    }
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    var s =
      year +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date);
    return s;
  },
  getTime1() {
    var _this = this;
    _this.getTime(7);
  },
  TimeMM(e) {
    console.log(e.currentTarget.dataset, 'kanxia1');
  },
  XZrq(e) {
    console.log(e.target.dataset.index_1);
    var _this = this;
    _this.setData({
      day: e.target.dataset.index_1,
    });
    console.log(_this.__data__.list_1[e.target.dataset.index_1]);
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/admin/DateScheduling/find',
      method: 'post',
      data: {
        // attend_id: _this.__data__.user.id,
        attend_id: 491,
        time: _this.__data__.list_1[e.target.dataset.index_1],
      },
      success(res) {
        console.log(res.data.data, '看看数据');
        if (res.data.code == 1) {
          _this.setData({
            timeD: '',
          });
        }
        if (res.data.code == 0) {
          _this.setData({
            timeD: res.data.data,
          });
        }
      },
    });
  },
  // 选择时间段
  XZsjd(e) {
    console.log(e.target.dataset.lb);
    var _this = this;
    if (e.target.dataset.lb == 'A') {
      console.log(_this.__data__.A, '看下');
      if (_this.__data__.A == 1) {
        // console.log('111');
        _this.setData({
          A: 0,
        });
        return;
      }
      if (_this.__data__.A == 0) {
        _this.setData({
          A: 1,
        });
        return;
      }
    }
    if (e.target.dataset.lb == 'B') {
      console.log(_this.__data__.B, '看下');
      if (_this.__data__.B == 1) {
        // console.log('111');
        _this.setData({
          B: 0,
        });
        return;
      }
      if (_this.__data__.B == 0) {
        _this.setData({
          B: 1,
        });
        return;
      }
    }
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
      },
    });
    _this.getTime(7);
    console.log(_this.getTime(-0), '下周开始1');
    console.log(_this.getTime(-1), '下周开始2');
    console.log(_this.getTime(-2), '下周开始3');
    console.log(_this.getTime(-3), '下周开始4');
    console.log(_this.getTime(-4), '下周开始5');
    console.log(_this.getTime(-5), '下周开始6');
    console.log(_this.getTime(-13), '下周结束7');
    var aa = _this
      .getTime(-0)
      .slice(_this.getTime(-0).length - 2, _this.getTime(-0).length);
    console.log(aa, '这是啥');
    var list = [
      _this
        .getTime(-7)
        .slice(_this.getTime(-7).length - 2, _this.getTime(-7).length),
      _this
        .getTime(-8)
        .slice(_this.getTime(-8).length - 2, _this.getTime(-8).length),
      _this
        .getTime(-9)
        .slice(_this.getTime(-9).length - 2, _this.getTime(-9).length),
      _this
        .getTime(-10)
        .slice(_this.getTime(-10).length - 2, _this.getTime(-10).length),
      _this
        .getTime(-11)
        .slice(_this.getTime(-11).length - 2, _this.getTime(-11).length),
      _this
        .getTime(-12)
        .slice(_this.getTime(-12).length - 2, _this.getTime(-12).length),
      _this
        .getTime(-13)
        .slice(_this.getTime(-13).length - 2, _this.getTime(-13).length),
    ];
    var list_1 = [
      _this.getTime(-7),
      _this.getTime(-8),
      _this.getTime(-9),
      _this.getTime(-10),
      _this.getTime(-11),
      _this.getTime(-12),
      _this.getTime(-13),
    ];
    // list.push._this.getTime(-7);
    console.log(list, '看下数组');
    _this.setData({
      list: list,
    });
    _this.setData({
      list_1: list_1,
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
