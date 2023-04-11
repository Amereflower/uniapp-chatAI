<template>
	<view class="container">
		<view class="scroll" :style="{height:scrollHeight}">
			<drawer @delete-conver="deleteConver" @change-conver-id="changeConverId" @single="singleQuestion"
				ref="drawer"></drawer>
			<scroll-view scroll-y style="height:100%" :scroll-into-view="scrollView">
				<view v-for="(item,index) in chatMsg" :key=index>
					<view class="item flex-row" :class="item.position">
						<image v-if="item.position=== 'left'" src="../../static/face.png" class="face"></image>
						<image v-else src="../../static/natural.png" class="face"></image>
						<text class="content flex-row" :class=item.position user-select="true">{{item.msg}} </text>
					</view>
				</view>
<button @click="showStorage" style="margin-bottom: 500rpx;">查看缓存</button>
				<view id="bottom"></view>
			</scroll-view>

		</view>
		
		<view class="text-btn">
			<view style="width: 600rpx;">
				<uni-easyinput class="uni-mt-5 input-box" trim="both" v-model="value" placeholder="请输入内容" type="text"
					@focus="scrollToBottom" :clearable="false">
				</uni-easyinput>
			</view>
			<view class="send-btn" hover-class="send-btn-click" @click="sendClick">
				<uni-icons type="paperplane-filled" size=30 color="#4285f4"></uni-icons>
				<text class="btn-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	import drawer from '@/components/index/drawer.vue'
	export default {
		components: {
			drawer
		},
		data() {
			return {
				conver_id: '', //用于连续对话发送到后端的哈希值id
				chat_list_id: 0, //用于从缓存中取聊天记录的第n组id（下标）
				localurl: 'http://192.168.86.54:8080',
				severurl: 'http://123.60.141.75:1655',
				questWay: 'continuous',
				scrollHeight: 'auto',
				scrollView: 'default',
				isFocus: false,
				content: '',
				value: '',
				chatMsg: [{
					position: 'left',
					msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
				}, ]

			}
		},
		onNavigationBarButtonTap(e) {
			this.$refs.drawer.showDrawer()
		},
		onLoad() {
			this.setScrollHeight()

			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight
				}
			})
		},
		methods: {
			setScrollHeight(descHeight = 0) {
				// #ifdef MP-WEIXIN
				this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
				// #endif
				// #ifdef APP-PLUS
				this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
				// #endif
				// #ifdef H5
				this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
				// #endif

			},
			sendClick() {

				this.chatMsg.push({
					position: 'right',
					msg: this.value,
				})
				uni.showLoading({
					title: "思考中",
					mask: true,
				})
				uni.request({
					url: `${this.severurl}/${this.questWay}`,
					method: 'POST',
					data: {
						msg: this.value,
						session_id: this.conver_id
					},
					success: (res) => {
						this.chatMsg.push({
							position: 'left',
							msg: res.data,	
						})
						this.scrollToBottom()
						uni.hideLoading()
					}
				})

				this.scrollToBottom()
				this.value = ' '

			},
			// input(e) {
			// 	console.log("输入内容", e)
			// },

			scrollToBottom() {
				setTimeout(() => {
					this.scrollView = 'bottom'
					setTimeout(() => {
						this.scrollView = 'default'
					}, 100)
				}, 100)
			},
			singleQuestion(isSingle) {
				if (isSingle) {
					this.questWay = `single`
					console.log(`single done${this.questWay}`)
				} else {
					this.questWay = `continuous`
					console.log(`test done ${this.questWay}`)
				}
			},
			changeConverId(new_id) {
				console.log("shei zai limian")
				
				console.log(`new_id is ${new_id}`)
				console.log(`old_id is ${this.chat_list_id}`)
				if (this.chat_list_id === new_id ) {
					return
				} else if(this.chat_list_id === 0){
					this.chat_list_id=1
				} else{
					const response = uni.getStorageSync('chat_history')
					const allData = response
					allData[this.chat_list_id - 1].chatMsg = this.chatMsg
					uni.setStorageSync('chat_history',allData)
		
			}

			this.chat_list_id = new_id
			console.log(`新的对话在数组中是第${new_id}项`)
			const resp = uni.getStorageSync('chat_history')
			const nowChat = resp[new_id-1]
			this.conver_id = nowChat.id
			this.chatMsg = nowChat.chatMsg
			
		},
	
		// setScrollHeight(descHeight=0){
		// 	// #ifdef MP-WEIXIN
		// 	this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
		// 	// #endif
		// 	// #ifdef APP-PLUS
		// 	this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
		// 	// #endif
		// 	// #ifdef H5
		// 	this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
		// 	// #endif
		// },
		
		//难道是同时触发delete吗
		deleteConver() {
			// uni.getStorage({
			// 	key: 'chat_history',
			// 	success: (res) => {
			// 		if (res.data.length === 0) {

			// 		} else {
			// 			const nowChat = res.data[0]
			// 			this.conver_id = nowChat.id
			// 			this.chatMsg = nowChat.chatMsg
			// 			//取内存并赋值第零项目
			// 		}
			// 	}
			// })
		},
		showStorage() {
			uni.getStorage({
				key:'chat_history',
				success:(res)=>{
					console.log("当前缓存是")
					console.log(res.data)
				}
			})
		}

	}
}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		overflow: hidden;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.scroll {
		padding-top: 20upx;
		overflow-y: auto;
		transition: all 0.1s ease;
		height: calc(100vh - 88upx - 110upx - var(--status-bar-height));

		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 88upx - var(--status-bar-height));
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 88upx - 110upx - var(--status-bar-height));
		/* #endif */

		.item-space {
			height: 30upx;
		}

		.item {
			margin: 0 30upx 30upx;
			align-items: flex-start;
			justify-content: flex-start;

			.face {
				width: 80upx;
				height: 80upx;
				border-radius: 10upx;
			}

			.content {
				color: #000;
				font-size: 32upx;
				// min-height: 80upx;
				border-radius: 10upx;
				padding: 20upx 24upx;
				background-color: #fff;
				word-break: break-all;
				word-wrap: break-word;
				max-width: calc(100% - 100upx - 120upx);
				position: relative;

				&::before {
					content: '';
					width: 0;
					height: 0;
					border-right: 30upx solid #FFF;
					border-top: 20upx solid transparent;
					border-bottom: 20upx solid transparent;
					position: absolute;
					top: 24upx;
				}
			}

			&.left {
				.face {
					margin-right: 30upx;
				}

				.content::before {
					left: -20upx;
				}
			}

			&.right {
				flex-direction: row-reverse;

				.face {
					margin-left: 30upx;
				}

				.content {
					background-color: #A0EA6F;

					&::before {
						right: -20upx;
						transform: rotate(180deg);
						border-right: 30upx solid #A0EA6F;
					}
				}
			}
		}

		#bottom {
			height: 0;
		}
	}

	.oper {
		height: 110upx;
		padding: 0 20upx;
		box-sizing: border-box;
		border-top: 2upx solid #EEE;
		border-bottom: 2upx solid #EEE;

		.input {
			height: 68upx;
			line-height: 68upx;
			padding: 0 20upx;
			font-size: 28upx;
			border-radius: 10upx;
			background-color: #fff;
			width: calc(100% - 120upx - 20upx - 40upx - 60upx);
		}
	}


	.uni-mt-5 {
		margin-top: 0%;
	}

	.input-box {
		/* position:fixed;
		bottom:20px; */
		// display: flex;
		// flex-direction: row;
		// align-items: center;
		// justify-content: space-between;
		// height: 110upx;
		// padding: 0 20upx;
		// box-sizing: border-box;
		// border-top: 2upx solid #EEE;
		// border-bottom: 2upx solid #EEE;
		// line-height: 100rpx;
		// flex: 0 0 100rpx;
	}

	.left-face {
		height: 80upx;
		width: 80upx;
		margin-left: 30upx;
	}

	.text-btn {
		height: 80rpx;
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
	}

	.send-btn {
		margin-left: 10rpx;
		margin-right: 10rpx;
		height: 67rpx;
		width: 100rpx;
		border: solid;
		border-radius: 10rpx;
		border-color: #4285f4;
		flex: auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.send-btn-click {
		background-color: #fffae8;

	}

	.btn-text {
		font-size: 1ch;
		color: #4285f4;
	}
</style>