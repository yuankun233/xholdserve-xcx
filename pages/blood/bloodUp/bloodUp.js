// pages/blood/bloodUp/bloodUp.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basics: 0,
    imgList: [],
    qRCodeMsg: [],
    base64: [],
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
        console.log(res, '11');
        // tempFilePath可以作为img标签的src属性显示图片
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: (res) => {
              //成功的回调
              // console.log(res.data, '是哈');
              // console.log('data:image/png;base64,' + res.data);
              // var data1 = 'data:image/png;base64,' + res.data;
              // var data1 = JSON.stringify(res.data);
              var data1 = res.data;
              var base64 = [..._this.__data__.base64, data1];
              _this.setData({
                base64: base64,
              });
            },
          });
        }
      },
    });
  },
  // 扫描 码
  smFn(e) {
    var _this = this;
    console.log(e.currentTarget.dataset.materialno, '111');
    console.log(e.currentTarget.dataset.inx, '下标');
    // console.log(_this.__data__.qRCodeMsg.length);
    if (_this.__data__.qRCodeMsg.length < e.currentTarget.dataset.inx) {
      wx.showToast({
        title: '请按顺序扫描',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    wx.scanCode({
      //扫描API
      success: function (res) {
        console.log(res.result); //输出回调信息
        var num = e.currentTarget.dataset.inx + 1;
        if (num < 10) {
          console.log(11);
          num = '0' + num;
        }
        var obj = {
          materialNo: e.currentTarget.dataset.materialno,
          subBarcode: res.result + `-${num}`,
        };
        var list = _this.__data__.qRCodeMsg;
        list.splice(e.currentTarget.dataset.inx, 1, obj);
        _this.setData({
          qRCodeMsg: list,
        });
        wx.showToast({
          title: '扫描成功',
          duration: 2000,
        });
      },
    });
  },
  // 上传
  UpFn() {
    var _this = this;
    if (_this.__data__.imgList == '') {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (_this.__data__.qRCodeMsg.length < _this.__data__.item.sss.length) {
      wx.showToast({
        title: '请上传全部的扫码图片',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    console.log(_this.__data__.qRCodeMsg, '条形码');
    console.log(
      JSON.stringify(_this.__data__.base64),
      '图片11111111111111111111'
    );
    console.log(_this.__data__.qRCodeMsg);
    var qRCodeMsg = _this.__data__.qRCodeMsg;
    // return;
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/open/jinyu/saveBarcode', //仅为示例，并非真实的接口地址
      data: {
        orderId: _this.__data__.item.orderId,
        subBarcode: JSON.stringify(_this.__data__.qRCodeMsg),
        barcodeImg: _this.__data__.base64,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'post',
      success(res) {
        console.log(res, 'kankan');
        console.log(res.data.data, 'kankan');
        // return;
        var dataJy = res.data.data;
        if (res.data.errno == 0) {
          wx.request({
            url:
              'https://km2c-uat.kingmed.com.cn/km2c-api/rest/sample/saveBarcode',
            data: dataJy,
            method: 'post',
            header: {
              'content-type': 'application/json', // 默认值
            },
            success(res) {
              console.log(res, '1');
              console.log(res.data, '2');
              console.log(res.data.data, '3');
              if (res.data.errno == '0') {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  duration: 2000,
                });
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
    console.log(options.id, '看看是啥');
    var _this = this;
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
