// pages/home/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 电话
    phone: '',
    code: '',
    // 密码
    invite: '',
    // 倒计时
    time: '',
    title: '获取验证码',
    settimes: '',
    type: 1,
    ///滑块
    x: 0,
    area_width: 85, //可滑动区域的宽，单位是百分比，设置好后自动居中
    box_width: 120, //滑块的宽,单位是 rpx
    maxNum: 0, //验证成功时的坐标，不需要设置，代码自动计算,
    coord: 0,
    isFlag: false,
    none: '',
  },
  xiugai() {
    var _this = this;
    //一定要写成this.data.isDisabled，不然判断出不来
    if (_this.data.none == '') {
      //当disabled=false时
      _this.setData({
        none: 'none', //修改isDisabled的值为true（即启用状态）
        //文字修改为“编辑”
      });
    } else {
      //当disabled=true时
      _this.setData({
        none: 1, //修改isDisabled的值为false（即禁用状态）
        //文字修改为“保存”
      });
    }

    wx.request({
      url: 'https://www.xiaohulaile.com/xh/p/attendxcx/attend/replace_data',
      method: 'post',
      data: {
        phone: _this.__data__.phone,
        code: _this.__data__.code,
        value: _this.__data__.invite,
        type: 2,
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          none: true, //修改isDisabled的值为true（即启用状态）
          //文字修改为“编辑”
        });
        if (res.data.code == 0) {
          wx.redirectTo({
            url: '/pages/login/login',
          });
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: '修改密码失败',
            icon: 'success',
            duration: 2000,
          });
        }
      },
    });
  },
  // 登陆|注册15049277710
  selectChange: function (e) {
    clearInterval(this.settimes);
    this.setData({
      select: e.currentTarget.dataset.index,
      time: '',
      title: '获取验证码',
      settimes: '',
      phone: '',
      code: '',
      invite: '',
    });
  },
  // hfewkhfikghuioweaghuilwayhtqwfgiuyhweuiF
  drag: function (e) {
    var that = this;
    that.setData({
      isFlag: true,
      coord: e.detail.x,
    });
  },

  dragOver: function (e) {
    var that = this;
    console.log(that.data.coord);
    console.log(that.data.maxNum);
    if (that.data.coord >= that.data.maxNum) {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 2000,
      });
      //验证成功之后的代码
    } else {
      that.setData({
        x: 0,
      });
    }
  },
  // 获取验证码
  getCode: function () {
    var _this = this;
    if (_this.data.phone == 0) {
      wx.showToast({
        title: '请填写电话',
        icon: 'none',
        duration: 2000,
      });
      _this.setData({
        time: '',
        title: '获取验证码',
      });
      return;
    } else if (!/^1[3456789]\d{9}$/.test(_this.data.phone)) {
      wx.showToast({
        title: '电话格式不对',
        duration: 1000,
      });
      return;
    }

    console.log(_this.data.isFlag);
    if (_this.data.isFlag === true) {
      if (_this.data.time == '') {
        wx.request({
          url: 'https://www.xiaohulaile.com/xh/p/xcx/sms/send_sms',
          method: 'post',
          data: {
            phone: _this.data.phone,
            sms_type: '1',
          },
          type: 'post',
          success(res) {
            console.log(res, res.data.message);

            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000,
            });
          },
        });
        this.setData({
          time: 60,
          title: 'S后重新获取',
        });
        _this.settimes = setInterval(function () {
          if (_this.data.time == 0) {
            _this.setData({
              time: '',
              title: '获取验证码',
            });
            clearInterval(_this.settimes);
            return;
          }
          _this.setData({
            time: --_this.data.time,
          });
        }, 1000);
      }
    } else {
      wx.showToast({
        title: '请滑动验证',
        icon: 'none',
        duration: 2000,
      });
    }
  },
  // 验证手机号
  verifyPhone: function (res) {
    this.setData({
      phone: res.detail.value,
    });
  },
  // 获取code
  verifyCode: function (res) {
    this.setData({
      code: res.detail.value,
    });
  },
  // 获取invite
  verifyInvite: function (res) {
    this.setData({
      invite: res.detail.value,
    });
  },
  radioChange: function (e) {
    this.setData({
      type: e.detail.value,
    });
  },

  // 提交
  login: function () {
    var _this = this;
    //一定要写成this.data.isDisabled，不然判断出不来
    if (_this.data.none == '') {
      //当disabled=false时
      _this.setData({
        none: 'none', //修改isDisabled的值为true（即启用状态）
        //文字修改为“编辑”
      });
    } else {
      //当disabled=true时
      _this.setData({
        none: 1, //修改isDisabled的值为false（即禁用状态）
        //文字修改为“保存”
      });
    }
    if (_this.data.type == 1) {
      var url = 'https://www.xiaohulaile.com/xh/p/xcx/user/do_login';
      var data = {
        type: parseInt(_this.data.select) + 1,
        phone: _this.data.phone,
        open_id: getApp().globalData.userInfo.openid,
        code: _this.data.code,
        invite_from: _this.data.invite,
      };
      getApp().globalData.nurseing = false;
    } else if (_this.data.type == 2) {
      var url = 'https://www.xiaohulaile.com/xh/p/app/attend/do_login';
      var data = {
        type: 2,
        phone: _this.data.phone,
        code: _this.data.code,
      };
      getApp().globalData.nurseing = true;
    }
    if (_this.data.none == 'none') {
      //当disabled=false时

      _this.setData({
        none: '', //修改isDisabled的值为true（即启用状态）
        //文字修改为“编辑”
      });
    }
    wx.request({
      url: url,
      method: 'post',
      data: data,
      success(res) {
        console.log(res.data, '登录全部信息');
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000,
        });
        if (res.data.code == 0) {
          // 存储用户id
          wx.setStorage({
            key: 'user_id',
            data: res.data.data.id,
          });
          wx.setStorage({
            key: 'user_img',
            data: res.data.data.img,
          });
          if (_this.data.type == 1) {
            getApp().globalData.userInfo.phone = res.data.data.phone;
            getApp().globalData.userInfo.user_token = res.data.data.user_token;
            getApp().globalData.userdata = res.data.data;
            wx.setStorage({
              key: 'user_token',
              data: res.data.data.user_token,
            });
            wx.setStorage({
              key: 'phone',
              data: res.data.data.phone,
            });
          } else if (_this.data.type == 2) {
            getApp().globalData.userInfo.phone = _this.data.phone;
            getApp().globalData.userInfo.user_token = res.data.data.token;
            getApp().globalData.userdata = res.data;
            wx.setStorage({
              key: 'user_token',
              data: res.data.data.token,
            });
            wx.setStorage({
              key: 'phone',
              data: _this.data.phone,
            });
          }
          wx.switchTab({
            url: '/pages/home/index/index',
          });
        }
      },
    });
  },
  intoAgreement: function () {
    wx.navigateTo({
      url: '/pages/home/login/agreement/agreement',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        console.log(that.data.area_width);
        var n = Math.floor(
          (res.windowWidth * that.data.area_width) / 103 -
            that.data.box_width / 2
        );
        that.setData({
          maxNum: n,
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
