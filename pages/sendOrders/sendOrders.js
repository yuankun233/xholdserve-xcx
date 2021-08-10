// pages/sendOrders/sendOrders.js
import fetch from '../../request/fetch';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //用户
    user: '',
    start: '1',
    // 护理站id
    HLZid: '',
    startH: '0',
    hlzArray: [],
    hlz1Array: [],
    index: '0',
    // 待派单
    info: [],
    // 正在进行
    info1: '',
    // 全部订单
    info2: '',
    // 分页
    page_no: 1,
  },
  clickStart(e) {
    var _this = this;
    _this.setData({
      page_no: 1,
    });
    _this.setData({
      info: [],
    });
    console.log(e.currentTarget.dataset.start);
    var _this = this;
    _this.setData({
      start: e.currentTarget.dataset.start,
    });
    // _this.getinfo(e.currentTarget.dataset.start)
    var index = _this.__data__.index;
    console.log(index, 'xiabao');
    var nid = _this.__data__.hlzArray[index].nid;
    console.log(nid, '护理站id');
    _this.getinfo(e.currentTarget.dataset.start, nid);
  },
  bindPickerChange: function (e) {
    var _this = this;
    _this.setData({
      page_no: 1,
    });
    _this.setData({
      info: [],
    });
    _this.setData({
      start: '1',
    });
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var _this = this;
    wx.setStorage({
      key: 'HLZ',
      data: _this.__data__.hlzArray[e.detail.value],
    });
    _this.setData({
      index: e.detail.value,
    });
    _this.setData({
      HLZid: _this.__data__.hlzArray[e.detail.value].nid,
    });
    console.log('执行');
    _this.getinfo(
      _this.__data__.start,
      _this.__data__.hlzArray[e.detail.value].nid
    );
  },
  getHlzArray() {
    var _this = this;
    wx.request({
      url: 'https://www.xiaohulaile.cn/xh/p/attendxcx/nursing/index',
      method: 'post',
      data: {
        phone: _this.__data__.user.phone,
      },
      success(res) {
        console.log(res.data.data, '测试');
        wx.setStorage({
          key: 'HLZ',
          data: res.data.data[0],
        });
        _this.setData({
          hlzArray: res.data.data,
        });
        var data = res.data.data.map((item) => {
          return item.name;
        });
        console.log(data, '过滤');
        _this.setData({
          hlz1Array: data,
        });
        _this.setData({
          HLZid: _this.__data__.hlzArray[0].nid,
        });
        console.log(_this.__data__.hlzArray[0].nid, '看看');
        _this.getinfo(
          _this.__data__.start,
          _this.__data__.hlzArray[0].nid,
          _this.__data__.page_no
        );
        // wx.request({
        //   url: 'http://www.xiaohulaile.com/xh/p/manager/order/order_list',
        //   method: 'post',
        //   data: {
        //     type: '1',
        //     nid: _this.__data__.hlzArray[0].nid,
        //     user_token: _this.__data__.hlzArray[0].user_token,
        //   },
        //   success(res) {
        //     console.log(res, '测试nnananna1');
        //     _this.setData({
        //       info: res.data.data.datalist,
        //     });
        //   },
        // });
        // _this.getinfo(1, _this.__data__.hlzArray[0].nid);
      },
    });
  },
  // 获取单
  getinfo(id, nid, page) {
    var _this = this;
    console.log(_this.__data__.hlzArray[0].user_token, '护理站token');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/manager/order/order_list',
      method: 'post',
      data: {
        type: id,
        nid: nid,
        page_no: page,
        user_token: _this.__data__.hlzArray[0].user_token,
      },
      success(res) {
        console.log(res.data.data.datalist, '测试');
        _this.setData({
          info: [..._this.__data__.info, ...res.data.data.datalist],
        });
      },
    });
  },
  assign(e) {
    console.log('11111');
    console.log(e.currentTarget.dataset.orderid);
    var _this = this;
    wx.setStorage({
      key: 'PDorderID',
      data: e.currentTarget.dataset.orderid,
    });
    wx.navigateTo({
      url: '/pages/pppp/pppp',
    });
  },
  PAIDAN(e) {
    console.log(e.currentTarget.dataset.did, '看下订单id');
    wx.navigateTo({
      url: `/pages/transfer/transfer?id=${e.currentTarget.dataset.did}`,
    });
  },
  order_out(e) {
    console.log(e.currentTarget.dataset.orderid1, '看下订单id');
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认转出订单?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.xiaohulaile.com/xh/p/admin/Order/order_station',
            method: 'post',
            data: {
              id: e.currentTarget.dataset.orderid1,
              user_token: _this.__data__.user.user_token,
            },
            success(res) {
              console.log(res, '点击11111');
              if (res.data.code == 0) {
                wx.reLaunch({
                  url: '/pages/order_out/order_out',
                });
              } else {
                wx.showToast({
                  title: '转出失败',
                  duration: 2000,
                });
              }
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },
  orderAll(e) {
    console.log(e, 'lalalal');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options, '我看看状态');
    _this.setData({ start: options.start });
    wx.getStorage({
      key: 'use',
      success(res) {
        console.log(res.data);
        _this.setData({
          user: res.data,
        });
        _this.setData({
          start: '1',
        });
        _this.getHlzArray();
        console.log(_this.__data__.hlzArray, 'Nidddd');
      },
    });
    // console.log(_this.__data__.hlzArray[0].nid, '看看');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var _this = this;
    // _this.getinfo(1, _this.__data__.hlzArray[0].nid);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var _this = this;
    // _this.getinfo(1, _this.__data__.hlzArray[0].nid);
  },

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
  onReachBottom: function () {
    var _this = this;
    _this.setData({
      page_no: _this.__data__.page_no + 1,
    });
    _this.getinfo(
      _this.__data__.start,
      _this.__data__.HLZid,
      _this.__data__.page_no
    );
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
