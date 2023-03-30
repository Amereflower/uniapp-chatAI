"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chatNum: []
    };
  },
  created: function() {
    this.chatNum = 1;
    common_vendor.index.request({
      url: "http://123.60.188.11:1655/getconverid",
      method: "GET",
      success: (res) => {
        common_vendor.index.setStorage({
          key: "chat_history",
          data: [
            {
              "id": res.data,
              "chatMsg": [{
                position: "left",
                msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
              }]
            }
          ]
        });
      }
    });
    this.$emit("change-conver-id", 1);
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
      this.$emit("change-conver-id", cov_id);
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    singleQuestion() {
      this.$emit("single", true);
    },
    getConversationId() {
      common_vendor.index.request({
        url: "http://123.60.188.11:1655/getconverid",
        method: "GET",
        success: (res) => {
          const conv_id = res.data;
          common_vendor.index.getStorage({
            key: "chat_history",
            success: (response) => {
              const chatData = response.data;
              chatData.push({
                "id": conv_id,
                "chatMsg": [{
                  position: "left",
                  msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
                }]
              });
              this.chatNum++;
              common_vendor.index.setStorage({
                key: "chat_history",
                data: chatData
              });
            }
          });
        }
      });
      this.$refs.showRight.close();
    },
    checkStorage() {
      console.log("对话总数为", this.chatNum);
      common_vendor.index.getStorage({
        key: "chat_history",
        success: function(res) {
          console.log(res.data[0].id);
        }
      });
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
    a: common_vendor.f($data.chatNum, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.chooseConversation(index + 1), item),
        c: common_vendor.o(($event) => $options.confirmDel(index + 1), item),
        d: item
      };
    }),
    b: common_vendor.o((...args) => $options.getConversationId && $options.getConversationId(...args)),
    c: common_vendor.o((...args) => $options.singleQuestion && $options.singleQuestion(...args)),
    d: common_vendor.o((...args) => $options.checkStorage && $options.checkStorage(...args)),
    e: common_vendor.sr("showRight", "0c36cdf4-0"),
    f: common_vendor.p({
      mode: "right",
      ["mask-click"]: false
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderX/HbuilderXProjects/chatGPT/components/index/drawer.vue"]]);
wx.createComponent(Component);
