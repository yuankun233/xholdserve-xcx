// pages/particulars/particulars.js
import fetch from "../../request/fetch"
import plugin from "../../src/component/v2/plugins/index"
// 设置代办
import todo from "../../src/component/v2/plugins/todo"
// 禁用/启用可选状态
import selectable from "../../src/component/v2/plugins/selectable"
// 农历相关功能
import solarLunar from "../../src/component/v2/plugins/solarLunar/index"
plugin.use(todo).use(solarLunar).use(selectable)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    // 护理员id
    id: "",
    id_order: "",
    token: "",
    info: "",
    isSHOW: false,
    toSet: [],
    tabStatus:""
  },
  doSometing(data) {
    // 获取日历组件上的 calendar 对象
    var _this = this
    console.log(_this.selectComponent("#calendar"))
    const calendar = _this.selectComponent("#calendar").calendar
    // 调用 calendar 对象上的方法
    // calendar.jump({ year: 2018, month: 6, date: 6 });
    // console.log(_this.toSet, '111');
    // const toSet = data;
    // console.log()
    // console.log(data, 'canshu');
    const toSet = data
    console.log(toSet, "kankna")
    calendar.setSelectedDates(toSet)
  },
  XX() {
    var _this = this
    _this.setData({
      isSHOW: false
    })
  },
  async calendar() {
    console.log("kanibbasdh1")
    var _this = this
    _this.setData({
      isSHOW: true
    })
    wx.request({
      url: "https://www.xiaohulaile.com/xh/p/admin/Calendar/index",
      method: "POST",
      header: { "content-type": "application/json" },
      data: {
        //xhr.status:获取当前服务器的响应状态  200=>成功
        status: 2,
        id: 924
      },
      success: function (res) {
        console.log(res.data.data, "11111111111111111111111")
        var toSet = []
        for (var i = 0; i < res.data.data.length; i++) {
          toSet.push(res.data.data[i].time)
          // console.log(this.arr2, '日历');
        }
        console.log(toSet, "看下值")
        // _this.setData({
        //   toSet: toSet,
        // });
        // setTimeout(() => {
        _this.doSometing(toSet)
        // }, 1000);
      }
    })
  },
  // 查询对应订单数据
  async getInfo() {
    var _this = this
    // console.log(_this);
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_data",
      data: {
        id: _this.__data__.id_order,
        token: _this.__data__.token
      }
    })
    console.log(res, "获取当前订单")

    _this.setData({
      info: res.data.data
    })
  },
  clickQR() {
    var _this = this
    // console.log(_this);
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: "https://www.xiaohulaile.cn/xh/p/attendxcx/Order/checkin",
          method: "POST",
          header: { "content-type": "application/json" },
          data: {
            //  护理员
            attend_id: _this.__data__.id,
            // 订单
            order_id: _this.__data__.info.id,
            // 待服务人员
            archive_id: _this.__data__.info.archive_id,
            token: _this.__data__.token,
            latitude: latitude,
            //jin度
            longitude: longitude
          },
          success(res) {
            // 1是签到已完成 成功  0是失败
            console.log(res.data, "111")
            if (res.data.code == 1) {
              wx.showModal({
                title: res.data.message
              })
            }

            if (res.data.code == 0) {
              wx.showModal({
                title: "签到成功",
                success(res) {
                  if (res.confirm) {
                    console.log("用户点击确定")
                    wx.navigateBack({
                      delta: 1
                    })
                  } else if (res.cancel) {
                    console.log("用户点击取消")
                  }
                }
              })
            }
          }
        })
      }
    })
    // var res = await fetch({
    //   url: 'https://www.xiaohulaile.cn/xh/p/attendxcx/Order/checkin',
    //   data: {
    //     // 护理员
    //     attend_id: _this.__data__.id,
    //     // 订单
    //     order_id: _this.__data__.info.id,
    //     // 待服务人员
    //     archive_id: _this.__data__.info.archive_id,
    //     token: _this.__data__.token,
    //     // 经纬
    //     latitude: _this.__data__.latitude,
    //     //维度
    //     longitude: _this.__data__.longitude,
    //   },
    // });
    // console.log(res);
    // if (res.data.code == 0) {
    //   wx.showToast({
    //     title: res.data.message,
    //   });
    // } else {
    //   wx.showToast({
    //     title: res.data.message,
    //   });
    // }
  },
  // 订单完成
  clickFinish() {
    var _this = this
    console.log(_this.data.id_order)

    wx.showModal({
      title: "提示",
      content: "是否确认完成订单",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定")
          wx.request({
            url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_ok",
            data: {
              id: _this.data.id_order,
              order_status: 2,
              token: _this.__data__.token
            },
            success(res) {
              console.log(res, "订单改变状态状态")
              // 如果改变成功则跳转到已完成
              // 所有服务次数均已完成
              if (res.data.order_status==2) {
                wx.showToast({
                  title: "订单已完成",
                  duration: 1000,
                  success() {
                    setTimeout(() => {
                      // 切换到已服务
                      wx.reLaunch({
                        url: "/pages/index/index?index_status=3"
                      })
                    }, 1000)
                  }
                })
              }
              // 完成单次服务，刷新本页面
              if (res.data.order_status==1) {
                
                wx.showToast({
                  title: "订单已完成",
                  duration: 1000,
                  success() {
                    setTimeout(() => {
                      // 切换到已服务
                      wx.reLaunch({
                        url: "/pages/index/index?index_status=2"
                      })
                    }, 1000)
                  }
                })
              }

            }
          })
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },
  clickQC() {
    var _this = this
    // console.log(_this);
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: "https://www.xiaohulaile.cn/xh/p/attendxcx/Order/checkout",
          method: "POST",
          header: { "content-type": "application/json" },
          data: {
            id: _this.__data__.info.check_id,
            token: _this.__data__.token,
            // wei纬
            latitude: latitude,
            //jin度
            longitude: longitude
          },
          success(res) {
            console.log(res.data, "111")
            if (res.data.code == 1) {
              wx.showModal({
                title: res.data.message
              })
            } else {
              wx.showToast({
                title: res.data.message
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options);
    this.setData({
      tabStatus:options.tabStatus
    })
    wx.getStorage({
      key: "id_order",
      success(res) {
        that.setData({
          id_order: res.data
        })
      }
    })
    wx.getStorage({
      key: "id_hly",
      success(res) {
        that.setData({
          id: res.data
        })
      }
    })
    wx.getStorage({
      key: "token",
      success(res) {
        that.setData({
          token: res.data
        })
        that.getInfo()
      }
    })
  }
})
