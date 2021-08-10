// pages/fill/Fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreement:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this=this
        wx.request({
          url: 'https://www.xiaohulaile.cn/xh/p/xcx/Tagreement/index',
          method:"POST",
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res){
      console.log(res.data.data)
            if(res.data.code==0){
               _this.setData({
                  agreement:res.data.data
                })
            }else if(res.data.code==1){
              wx.showToast({
                title: "服务器繁忙",
                icon: 'none',
                duration: 2000
              })
            }
          }
    
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})