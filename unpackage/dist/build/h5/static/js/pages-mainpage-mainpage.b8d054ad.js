(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mainpage-mainpage"],{"2cd7":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".block[data-v-5b40c79a]{width:%?700?%}",""]),t.exports=e},"30a5":function(t,e,n){"use strict";var i=n("b961"),s=n.n(i);s.a},"858b":function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{strogemsg:"what fuck?",thisismsg:"iamhere",list:[{text:1},{text:2},{text:3}],blockhigh:"100rpx"}},methods:{checkGetStroge:function(){var t=this;uni.getStorage({key:"thisisatest",success:function(e){t.strogemsg=e.data},error:function(){t.strogemsg="faled"}})},checkStroge:function(){var t=this;uni.setStorage({key:"thisisatest",data:"hello uniapp stroge!!",success:function(){t.thisismsg="success"}})},sendRequest:function(){uni.showLoading({title:"思考中",mask:!0}),setTimeout((function(){uni.hideLoading()}),2e3)}},computed:{}};e.default=i},"9fad":function(t,e,n){"use strict";n.r(e);var i=n("dce7"),s=n("a394");for(var a in s)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return s[t]}))}(a);n("30a5");var o=n("f0c5"),c=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,"5b40c79a",null,!1,i["a"],void 0);e["default"]=c.exports},a394:function(t,e,n){"use strict";n.r(e);var i=n("858b"),s=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=s.a},b961:function(t,e,n){var i=n("2cd7");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=n("4f06").default;s("56218096",i,!0,{sourceMap:!1,shadowMode:!1})},dce7:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"main"},[t._v("still developing"),n("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkStroge.apply(void 0,arguments)}}},[t._v("验证缓存")]),n("p",[t._v(t._s(t.thisismsg))]),n("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkGetStroge.apply(void 0,arguments)}}},[t._v("验证拿缓存："+t._s(t.strogemsg))])],1)},s=[]}}]);