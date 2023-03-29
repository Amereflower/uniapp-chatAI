<template>
	<view class="main">
		still developing
		<button @click="checkStroge">验证缓存</button>
		<p>{{thisismsg}}</p>
		<button @click="checkGetStroge">验证拿缓存：{{strogemsg}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strogemsg:'what fuck?',
				thisismsg:'iamhere',
				list:[{text:1},
				{text:2},
				{text:3}],
				blockhigh:'100rpx'
				
			}
		},
		methods:{
			checkGetStroge(){
				uni.getStorage({
					key: 'thisisatest',
					success: (res)=> {
						this.strogemsg = res.data
					},
					error:()=>{
						this.strogemsg = 'faled'
					}
				});
			},
			checkStroge(){
				uni.setStorage({
					key: 'thisisatest',
					data: 'hello uniapp stroge!!',
					success: ()=>{
						this.thisismsg = 'success'
					}
					
				});
			},
			sendRequest() {
				uni.showLoading({
					title:"思考中",
					mask:true,
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				
				// uni.request({
				// 	url:"http://ywjy.jupitergone.com/getweibo",
				// 	method:'GET',
				// 	success:(res) => {
				// 		 console.log(res.data)
				// 	}
				// })
			},
			
		},
		computed:{
			
		}
	}
</script>

<style>
	.block {
		width:700rpx;
	}
</style>