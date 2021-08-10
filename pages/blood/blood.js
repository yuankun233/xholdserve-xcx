// pages/blood/blood.js
import fetch from '../../request/fetch';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ['待服务', '服务中', '已完成'],
    orderList: '',
    HLYid: '',
    page: 1,
  },
  tabSelect(e) {
    var _this = this;
    _this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      page: 1,
    });
    //tab栏切换
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderlists', //仅为示例，并非真实的接口地址
      data: {
        docid: _this.__data__.HLYid,
        type: e.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data.data);
        _this.setData({
          orderList: res.data.data.data,
        });
      },
    });
  },
  goItem(res) {
    console.log(res);
    console.log(res.currentTarget.dataset.id);
    console.log(res.currentTarget.dataset.start, '状态');
    console.log(res.currentTarget.dataset.orderid, '订单id');
    var _this = this;
    // return;
    if (res.currentTarget.dataset.start == 3430) {
      wx.navigateTo({
        url: `/pages/blood/bloodUp/bloodUp?orderId=${res.currentTarget.dataset.orderid}&id=${res.currentTarget.dataset.id}`,
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/blood/bloodItem/bloodItem?id=${res.currentTarget.dataset.id}`,
    });
  },
  startFn(e) {
    console.log(e.currentTarget.dataset.start, '订单状态');
    console.log(e.currentTarget.dataset.id, '订单id');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/syncStatus', //仅为示例，并非真实的接口地址
      data: {
        orderId: e.currentTarget.dataset.id,
        status: e.currentTarget.dataset.start,
      },
      method: 'post',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data, '成功没');
        console.log(res, '是啥');
        var dataJy = res.data.data;
        if (res.statusCode == 200) {
          console.log(111);
          wx.request({
            url:
              'https://km2c-uat.kingmed.com.cn/km2c-api/rest/sample/syncStatus',
            data: dataJy,
            method: 'post',
            success(res) {
              console.log(res, '1');
              console.log(res.data, '2');
              // console.log(res.data.data, '3');
              if (res.data.errno == '0') {
                wx.reLaunch({
                  url: '/pages/blood/blood',
                });
              }
            },
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
          HLYid: res.data,
        });
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderlists', //仅为示例，并非真实的接口地址
          data: {
            docid: res.data,
            type: 0,
          },
          header: {
            'content-type': 'application/json', // 默认值
          },
          success(res) {
            console.log(res.data.data);
            _this.setData({
              orderList: res.data.data.data,
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
  onReachBottom: function () {
    var _this = this;
    var page = _this.__data__.page + 1;
    _this.setData({
      page: page,
    });
    // console.log(111);
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderlists', //仅为示例，并非真实的接口地址
      data: {
        docid: _this.__data__.HLYid,
        page: _this.__data__.page,
        type: _this.__data__.TabCur,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data.data);
        _this.setData({
          orderList: [..._this.__data__.orderList, ...res.data.data.data],
        });
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
