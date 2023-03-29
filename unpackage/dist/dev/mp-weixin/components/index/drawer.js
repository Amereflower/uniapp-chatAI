"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    confirmDel(cov_id) {
      common_vendor.index.showModal({
        title: "提示",
        content: `确定要删除 conversation${cov_id} 吗？`,
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
      this.$refs.showRight.close();
    },
    chooseConversation(cov_id) {
      common_vendor.index.showToast({
        title: `conversation${cov_id}`,
        image: "static/sucess.png",
        icon: "none",
        duration: 1e3
      });
      this.$refs.showRight.close();
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  _easycom_uni_drawer2();
}
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  _easycom_uni_drawer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(5, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.chooseConversation(index + 1), item),
        c: common_vendor.o(($event) => $options.confirmDel(index + 1), item),
        d: item
      };
    }),
    b: common_vendor.sr("showRight", "0c36cdf4-0"),
    c: common_vendor.p({
      mode: "right",
      ["mask-click"]: false
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderX/HbuilderXProjects/chatGPT/components/index/drawer.vue"]]);
wx.createComponent(Component);
