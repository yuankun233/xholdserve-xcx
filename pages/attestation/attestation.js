// pages/attestation/attestation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SFZZ: '',
    SFZF: '',
    ZZJ: '',
    SFZZ1: [],
    SFZF1: [],
    ZZJ1: [],
    ID: '',
    arrayH: ['护士', '医疗照护护理员', '养老护理员', '康复师'],
    index: '',
    // 护理站
    index2: '',
    //
    items: [
      { name: 1, value: '男', checked: 'true' },
      { name: 2, value: '女' },
    ],
    sex: '1',
    name: '',
    age: '',
    address: '',
    id: '',
    // 状态
    start: '1',
    // 护理站
    allHLZ: [],
    allHLZ1: [],
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
  upSFZZ() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          SFZZ: tempFilePaths,
        });
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: (res) => {
            //成功的回调
            console.log('data:image/png;base64,' + res.data);
            var data1 = 'data:image/png;base64,' + res.data;
            _this.setData({
              SFZZ1: data1,
            });
          },
        });
      },
    });
  },
  upSFZF() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          SFZF: tempFilePaths,
        });
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: (res) => {
            //成功的回调
            console.log('data:image/png;base64,' + res.data);
            var data1 = 'data:image/png;base64,' + res.data;

            _this.setData({
              SFZF1: data1,
            });
          },
        });
      },
    });
  },
  upZZJ() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          ZZJ: tempFilePaths,
        });
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: (res) => {
            //成功的回调
            console.log('data:image/png;base64,' + res.data);
            var data1 = 'data:image/png;base64,' + res.data;
            _this.setData({
              ZZJ1: data1,
            });
          },
        });
      },
    });
  },
  clickRz() {
    var _this = this;
    // if (_this.__data__.index) {
    //   console.log('优质');
    // }
    if (!_this.__data__.index) {
      console.log('没纸质');
      // _this.bindPickerChange();
      wx.showToast({
        title: '请选择护理类别',
        duration: 2000,
      });
    }
    if (!_this.__data__.index1) {
      console.log('没纸质');
      // _this.bindPickerChange();
      wx.showToast({
        title: '请选择护理机构',
        duration: 2000,
      });
    }
    //   console.log(_this);
    // if (!_this.__data__.SFZZ || !_this.__data__.SFZF) {
    //   console.log('!1');
    //   wx.showToast({
    //     title: '请上传身份证',
    //   });
    //   return;
    // }

    console.log(_this.__data__.SFZZ1);
    console.log(_this.__data__.SFZF1);
    console.log(_this.__data__.ZZJ1);
    var HLZID = _this.__data__.allHLZ[_this.__data__.index1].id;
    console.log(HLZID, '护理站id');
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/attend_action',
      method: 'post',
      data: {
        identityid: _this.__data__.SFZZ1,
        identityid_side: _this.__data__.SFZF1,
        kangfushi_certificatel: _this.__data__.ZZJ1,
        id: _this.__data__.ID,
        // type: 2,
        duid: parseInt(_this.__data__.index) + 1,
        nid: HLZID,
        sex: _this.__data__.sex,
        age: _this.__data__.age,
        address: _this.__data__.address,
        name: _this.__data__.name,
      },
      success(res) {
        console.log(res.data.code, '');
        if (res.data.code == 0) {
          console.log('11');
          wx.showToast({
            title: '已提交成功',
          });
          wx.reLaunch({
            url: '/pages/mydex/mydex',
          });
        }
      },
    });
  },
  goinuser() {
    wx.navigateTo({
      url: '/pages/modification/modification',
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index1: e.detail.value,
    });
  },
  XYY() {
    var _this = this;
    if (_this.__data__.name == '') {
      wx.showToast({
        title: '请填写名字',
        duration: 2000,
      });
      return;
    }
    if (_this.__data__.age == '') {
      wx.showToast({
        title: '请填写年龄',
        duration: 2000,
      });
      return;
    }
    if (_this.__data__.address == '') {
      wx.showToast({
        title: '请填写地址',
        duration: 2000,
      });
      return;
    }
    _this.setData({
      start: '2',
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
          ID: res.data,
        });
      },
    });
    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/nursing_list',
      method: 'post',
      success(res) {
        console.log(res, '护理站');
        _this.setData({
          allHLZ: res.data.data,
        });
        var data1 = res.data.data.map((item) => {
          return item.name;
        });
        _this.setData({
          allHLZ1: data1,
        });
        console.log(data1);
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
