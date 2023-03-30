"use strict";
const common_vendor = require("../../common/vendor.js");
const drawer = () => "../../components/index/drawer.js";
const _sfc_main = {
  components: {
    drawer
  },
  data() {
    return {
      conver_id: "",
      //用于连续对话发送到后端的哈希值id
      chat_list_id: 0,
      //用于从缓存中取聊天记录的第n组id（下标）
      localurl: "http://192.168.86.54:8080",
      severurl: "http://123.60.188.11:1655",
      questWay: "continuous",
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
      const que = this.value;
      common_vendor.index.getStorage({
        key: "chat_history",
        success: (res) => {
          const allData = res.data;
          allData[this.chat_list_id - 1].chatMsg.push({
            position: "right",
            msg: que
          });
          console.log(allData);
          common_vendor.index.setStorage({
            key: "chat_history",
            data: allData
          });
        }
      });
      common_vendor.index.showLoading({
        title: "思考中",
        mask: true
      });
      common_vendor.index.request({
        url: `${this.severurl}/${this.questWay}`,
        method: "POST",
        data: { msg: this.value, convo_id: this.conver_id },
        success: (res) => {
          this.chatMsg.push({
            position: "left",
            msg: res.data
          });
          const answer = res.data;
          common_vendor.index.getStorage({
            key: "chat_history",
            success: (res2) => {
              const allData = res2.data;
              allData[this.chat_list_id - 1].chatMsg.push({
                position: "left",
                msg: answer
              });
              common_vendor.index.setStorage({
                key: "chat_history",
                data: allData
              });
            }
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
    },
    singleQuestion(isSingle) {
      if (isSingle) {
        this.questWay = `single`;
        console.log(`single done${this.questWay}`);
      } else {
        this.questWay = `continuous`;
        console.log(`test done ${this.questWay}`);
      }
    },
    changeConverId(new_id) {
      this.chat_list_id = new_id;
      console.log(`在数组中是第${new_id}项`);
      common_vendor.index.getStorage({
        key: "chat_history",
        success: (res) => {
          const nowChat = res.data[new_id - 1];
          console.log(nowChat);
          this.conver_id = nowChat.id;
          this.chatMsg = nowChat.chatMsg;
        }
      });
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
    b: common_vendor.o($options.changeConverId),
    c: common_vendor.o($options.singleQuestion),
    d: common_vendor.f($data.chatMsg, (item, index, i0) => {
      return common_vendor.e({
        a: item.position === "left"
      }, item.position === "left" ? {} : {}, {
        b: common_vendor.t(item.msg),
        c: common_vendor.n(item.position),
        d: common_vendor.n(item.position),
        e: index
      });
    }),
    e: $data.scrollView,
    f: $data.scrollHeight,
    g: common_vendor.o($options.scrollToBottom),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      trim: "both",
      placeholder: "请输入内容",
      type: "text",
      clearable: false,
      modelValue: $data.value
    }),
    j: common_vendor.p({
      type: "paperplane-filled",
      size: "30",
      color: "#4285f4"
    }),
    k: common_vendor.o((...args) => $options.sendClick && $options.sendClick(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HbuilderX/HbuilderXProjects/chatGPT/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
