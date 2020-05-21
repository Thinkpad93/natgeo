// pages/bus/bus.js
import { baseUrl } from '../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, // 页数
    total: 0, // 总条数
    album: [] // 列表
  },
  /**
   * 获取数据
   */
  loadData: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `${baseUrl}/jiekou/mains/p${that.data.page}.html`,
      method: "GET",
      data: {},
      success: (res) => {
        if (res.statusCode === 200) {
          wx.hideLoading();
          let data = res.data;
          let album = data.album || [];
          that.setData({
            album: album,
            page: data.page,
            total: data.total
          })
        }
      },
      fail: function () {
        console.log('fail');
      }
    });
  },
  /**
   * 跳转详情页
   */
  toAlbumsPage: function (event) {
    wx.navigateTo({
      url: '../albums/albums?a=' + event.currentTarget.dataset.id,
    });
  },
  /**
   * 打开更多页面
   */
  openMoer: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  bindscroll: function (event) {
    console.log(event);
  },
  bindrefresherpulling(event) {
    console.log(event);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData();
    console.log('开始下拉');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    this.data.page++;
    let f = (this.data.total / 15).toFixed();
    if (this.data.page > f) {
      return;
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `${baseUrl}/jiekou/mains/p${that.data.page}.html`,
      method: "GET",
      data: {},
      success: function (res) {
        if (res.statusCode === 200) {
          wx.hideLoading();
          let data = res.data;
          let album = data.album || [];
          let _album = that.data.album;
          let list = _album.concat(album);
          that.setData({
            album: list
          })
          console.log(data);
        }
      }
    })
  },
})