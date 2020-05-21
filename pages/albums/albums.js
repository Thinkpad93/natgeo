// pages/albums/albums.js
import { baseUrl } from '../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    swiperIndex: 1, // 当前所在滑块的 index
    current: 0,
    picture: []
  },
  getAlbumsData(id) {
    wx.request({
      url: `${baseUrl}/jiekou/albums/a${id}.html`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data;
          let picture = data.picture || [];
          this.setData({
            picture: picture
          })
        }
      }
    })
  },
  swiperChange(event) {
    let { source, current } = event.detail;
    if (source === 'touch') {
      this.setData({
        swiperIndex: event.detail.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAlbumsData(options.a);
  },
  /**
   * 收藏
   */
  handleCollect: function() {},
  /**
   * 保存图片
   */
  handleSaveImg: function(url) {
    // 网络图片必须先下载
    wx.downloadFile({
      url,
      success: function(res) {
        
      }
    });
  }
})