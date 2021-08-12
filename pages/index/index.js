// pages/index/index.js
import fetch from "../../request/fetch"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "", // 用户信息
    topStart: 1, //代表订单状态
    info1: [],
    info2: [],
    info3: [],
    orderList: [], //订单列表
    none: "",
    //分页
    page_no: 1
  },
  // 获取随机码
  async code1(e) {
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.idx, "kanxiabao")
    var _this = this
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/attend/Random_num",
      data: {
        id: e.currentTarget.dataset.id
      }
    })
    console.log(res.data.data, "随机码")
    var price = "orderList[" + e.currentTarget.dataset.idx + "].random_num"
    _this.setData({
      [price]: res.data.data
    })
  },
  // 待服务、服务中、已完成切换
  clickCfn(e) {
    console.log(e.currentTarget.dataset.id)
    var _this = this
    // 转换tab栏，清除订单数据
    this.setData({
      topStart: e.currentTarget.dataset.id,
      page_no: 1,
      orderList: []
    })
    // 获取订单列表
    this.getOrderList()
    // _this.setData({
    //   info1: []
    // })
    // _this.setData({
    //   info2: []
    // })
    // _this.setData({
    //   info3: []
    // })
    // _this.setData({
    //   page_no: 1
    // })
    // _this.setData({
    //   topStart: e.currentTarget.dataset.id
    // })
    // if (e.currentTarget.dataset.id == 2) {
    //   _this.getInfo2(e.currentTarget.dataset.id)
    // }
    // if (e.currentTarget.dataset.id == 3) {
    //   _this.getInfo3(e.currentTarget.dataset.id)
    // }
    // if (e.currentTarget.dataset.id == 1) {
    //   _this.getInfo1(e.currentTarget.dataset.id)
    // }
  },

  async getOrderList() {
    var _this = this
    console.log(this.data.topStart)
    const cate = this.data.topStart - 1
    console.log(cate)
    // 请求列表
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_list",
      data: {
        order_status: cate,
        token: _this.__data__.user.token,
        // id: _this.__data__.id,
        // status: _this.data.topStart, // 订单类型
        page_no: _this.data.page_no, // 页码
        id: _this.__data__.user.id // 护士id
      }
    })
    console.log(res.data.data, "订单数据")
    console.log(res.data.message, "请求状态")
    // token过期验证
    if (res.data.message == "请重新登录") {
      wx.showToast({
        title: "请重新登录",
        duration: 1500,
        icon: "none",
        success: (result) => {
          wx.navigateTo({
            url: "/pages/login/login"
          })
        },
        fail: () => {},
        complete: () => {}
      })
    }
    if (res.data.message == "暂无订单") {
      this.setData({
        orderList: []
      })
      return
    }
    // 将订单数据存储到data中
    _this.setData({
      orderList: [..._this.__data__.orderList, ...res.data.data.datalist]
    })
  },
  // 待接单订单列表
  async getInfo1(page) {
    var _this = this
    console.log(_this, "222")
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_list",
      data: {
        order_status: 1,
        token: _this.__data__.user.token,
        // id: _this.__data__.id,
        page_no: page, // 页码
        id: _this.__data__.user.id
      }
    })
    console.log(res.data.data, "待接单订单数据")
    console.log(res.data.message, "待接单请求状态")
    if (res.data.message == "暂无订单") {
      this.setData({
        info1: []
      })
      return
    }
    _this.setData({
      info1: [..._this.__data__.info1, ...res.data.data.datalist]
    })
  },
  // 服务中订单列表
  async getInfo2(id, page) {
    var _this = this
    console.log(_this, "222")
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_list",
      data: {
        status: id,
        order_status: 2,
        token: _this.__data__.user.token,
        // id: _this.__data__.id,
        page_no: page,
        id: _this.__data__.user.id
      }
    })
    console.log(res.data.data, "服务中订单数据")
    console.log(res.data.message, "服务中订单请求状态")
    if (res.data.message == "暂无订单") {
      this.setData({
        info2: []
      })
      return
    }
    this.setData({
      info2: [..._this.__data__.info2, ...res.data.data.datalist]
    })
  },
  // 已完成订单列表
  async getInfo3(id, page) {
    var _this = this
    console.log(_this, "222")
    var res = await fetch({
      url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_list",
      data: {
        status: id,
        order_status: 3,
        token: _this.__data__.user.token,
        // id: _this.__data__.id,
        page_no: page,
        id: _this.__data__.user.id
      }
    })
    console.log(res.data, "已完成订单数据")
    console.log(res.data.message, "已完成请求状态")
    if (res.data.message == "暂无订单") {
      this.setData({
        info3: []
      })
      return
    }
    this.setData({
      info3: [..._this.__data__.info3, ...res.data.data.datalist]
    })
  },
  // 前往订单详情
  clickParticulars(e) {
    console.log(e.currentTarget.dataset)
    wx.setStorage({
      key: "id_order",
      data: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: "/pages/particulars/particulars"
    })
  },
  // 将待接单订单变为服务中
  order(e) {
    var _this = this
    console.log(e.currentTarget.dataset.index)
    wx.showModal({
      title: "提示",
      content: "是否接单",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定")
          wx.request({
            url: "https://www.xiaohulaile.com/xh/p/attendxcx/order/order_ok",
            data: {
              id: _this.__data__.orderList[e.currentTarget.dataset.index].id,
              order_status: 1,
              token: _this.__data__.user.token
            },
            success(res) {
              console.log(res, "订单改变状态状态")
              if (res.data.msg == "订单完成") {
                wx.showToast({
                  title: "接单成功",
                  duration: 1000,
                  success() {
                    setTimeout(() => {
                      // 切换到服务中
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    console.log(options.index_status)
    // 如果有传tab栏的值，更新tab栏
    if (options.index_status) {
      _this.setData({
        topStart: options.index_status
      })
    }

    console.log("6666666")
    // 获取用户信息
    wx.getStorage({
      key: "use",
      success(res) {
        console.log(res.data)
        _this.setData({
          user: res.data
        })
        _this.getOrderList() //获取订单列表
        // _this.getInfo2()
        if (_this.__data__.user.status == 1) {
          wx.showModal({
            title: "亲,请先认证哦",
            content: "~~~~0.0",
            success(res) {
              if (res.confirm) {
                console.log("用户点击确定")
                wx.reLaunch({
                  url: "/pages/attestation/attestation"
                })
              } else if (res.cancel) {
                console.log("用户点击取消")
                wx.reLaunch({
                  url: "/pages/attestation/attestation"
                })
              }
            }
          })
        }
      },
      fail() {
        wx.showToast({
          title: "请先登录",
          duration: 1500,
          icon: "none",
          success: (result) => {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          },
          fail: () => {},
          complete: () => {}
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    // 当列表滑到底部page增加
    _this.setData({
      page_no: _this.__data__.page_no + 1
    })
    _this.getOrderList() //获取订单列表

    // _this.getInfo1()
    // if (_this.__data__.topStart == 1) {
    // _this.setData({
    //   page_no: _this.__data__.page_no + 1
    // })
    // _this.getInfo1(_this.__data__.page_no)
    // }
    // if (_this.__data__.topStart == 2) {
    //   _this.setData({
    //     page_no: _this.__data__.page_no + 1
    //   })
    //   _this.getInfo2(_this.__data__.topStart, _this.__data__.page_no)
    // }
    // if (_this.__data__.topStart == 3) {
    //   _this.setData({
    //     page_no: _this.__data__.page_no + 1
    //   })
    //   _this.getInfo3(_this.__data__.topStart, _this.__data__.page_no)
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
