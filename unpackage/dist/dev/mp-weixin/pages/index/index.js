"use strict";
const common_vendor = require("../../common/vendor.js");
const drawer = () => "../../components/index/drawer.js";
const _sfc_main = {
  components: {
    drawer
  },
  data() {
    return {
      scrollHeight: "auto",
      scrollView: "default",
      isFocus: false,
      content: "",
      value: "",
      chatMsg: [
        {
          position: "left",
          msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
        }
      ]
    };
  },
  onNavigationBarButtonTap(e) {
    this.$refs.drawer.showDrawer();
  },
  onLoad() {
    this.setScrollHeight();
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
      }
    });
  },
  methods: {
    setScrollHeight(descHeight = 0) {
      this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`;
    },
    sendClick() {
      this.chatMsg.push({
        position: "right",
        msg: this.value
      });
      common_vendor.index.showLoading({
        title: "思考中",
        mask: true
      });
      common_vendor.index.request({
        url: "http://123.60.188.11:1655/test",
        method: "POST",
        data: { msg: this.value },
        success: (res) => {
          this.chatMsg.push({
            position: "left",
            msg: res.data
          });
          this.scrollToBottom();
          common_vendor.index.hideLoading();
        }
      });
      this.scrollToBottom();
      this.value = " ";
    },
    input(e) {
      console.log("输入内容", e);
    },
    scrollToBottom() {
      setTimeout(() => {
        this.scrollView = "bottom";
        setTimeout(() => {
          this.scrollView = "default";
        }, 100);
      }, 100);
    }
    // setScrollHeight(descHeight=0){
    //
    // 	this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
    //
    //
    //
    // },
  }
};
if (!Array) {
  const _component_drawer = common_vendor.resolveComponent("drawer");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_drawer + _easycom_uni_easyinput2 + _easycom_uni_icons2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("drawer", "4aa7b5ae-0"),
    b: common_vendor.f($data.chatMsg, (item, index, i0) => {
      return common_vendor.e({
        a: item.position === "left"
      }, item.position === "left" ? {} : {}, {
        b: common_vendor.t(item.msg),
        c: common_vendor.n(item.position),
        d: common_vendor.n(item.position),
        e: index
      });
    }),
    c: $data.scrollView,
    d: $data.scrollHeight,
    e: common_vendor.o($options.scrollToBottom),
    f: common_vendor.o(($event) => $data.value = $event),
    g: common_vendor.p({
      trim: "both",
      placeholder: "请输入内容",
      type: "text",
      clearable: false,
      modelValue: $data.value
    }),
    h: common_vendor.p({
      type: "paperplane-filled",
      size: "30",
      color: "#4285f4"
    }),
    i: common_vendor.o((...args) => $options.sendClick && $options.sendClick(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderX/HbuilderXProjects/chatGPT/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
