// pages/blood/bloodItem/bloodItem.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basics: 0,
    imgList: '',
    qRCodeMsg: '',
    item: '',
  },
  UpImage() {
    var _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        _this.setData({
          imgList: tempFilePaths,
        });
      },
    });
  },
  // 扫描 码
  smFn(e) {
    var _this = this;
    console.log(e, '11');
    // wx.scanCode({
    //   //扫描API
    //   success: function (res) {
    //     console.log(res); //输出回调信息
    //     _this.setData({
    //       qRCodeMsg: res.result,
    //     });
    //     wx.showToast({
    //       title: '成功',
    //       duration: 2000,
    //     });
    //   },
    // });
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
    console.log(options.id);
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/orderdetil', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data.data, '111');
        _this.setData({
          item: res.data.data,
        });
        if (res.data.data.status == '3201') {
          _this.setData({
            basics: 0,
          });
        }
        if (res.data.data.status == '3301') {
          _this.setData({
            basics: 1,
          });
        }
        if (res.data.data.status == '3331') {
          _this.setData({
            basics: 2,
          });
        }
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
