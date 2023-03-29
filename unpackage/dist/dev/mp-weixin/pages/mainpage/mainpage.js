"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      strogemsg: "what fuck?",
      thisismsg: "iamhere",
      list: [
        { text: 1 },
        { text: 2 },
        { text: 3 }
      ],
      blockhigh: "100rpx"
    };
  },
  methods: {
    checkGetStroge() {
      common_vendor.index.getStorage({
        key: "thisisatest",
        success: (res) => {
          this.strogemsg = res.data;
        },
        error: () => {
          this.strogemsg = "faled";
        }
      });
    },
    checkStroge() {
      common_vendor.index.setStorage({
        key: "thisisatest",
        data: "hello uniapp stroge!!",
        success: () => {
          this.thisismsg = "success";
        }
      });
    },
    sendRequest() {
      common_vendor.index.showLoading({
        title: "思考中",
        mask: true
      });
      setTimeout(function() {
        common_vendor.index.hideLoading();
      }, 2e3);
    }
  },
  computed: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.checkStroge && $options.checkStroge(...args)),
    b: common_vendor.t($data.thisismsg),
    c: common_vendor.t($data.strogemsg),
    d: common_vendor.o((...args) => $options.checkGetStroge && $options.checkGetStroge(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderX/HbuilderXProjects/chatGPT/pages/mainpage/mainpage.vue"]]);
wx.createPage(MiniProgramPage);
