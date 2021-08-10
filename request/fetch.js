const fetch = (obj) => {
  const p = new Promise((res, err) => {
    wx.request({
      url: obj.url,
      data: obj.data || {},
      method: obj.method || 'POST',
      header: obj.header || { 'content-type': 'application/json' },
      success: (r) => {
        res(r);
      },
      fail: (e) => {
        err(e);
      },
    });
  });
  return p;
};
export default fetch;
