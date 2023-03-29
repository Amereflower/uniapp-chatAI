<template>
	<view class="container">
		<view class="scroll" :style="{height:scrollHeight}">
			<button @click="showDrawer" type="primary">切换对话</button>
					<uni-drawer ref="showRight" mode="right" :mask-click="false">
						<scroll-view style="height: 100%;" scroll-y="true">
							<button @click="closeDrawer" type="primary">切换完成</button>
							<view class="shift-table" v-for="item in 3" ><button class="out-button">对话{{item}}</button><button class="in-button">x</button>  </view>
							<button>新建对话</button>
						</scroll-view>
					</uni-drawer>
			<scroll-view scroll-y style="height:100%" :scroll-into-view="scrollView">
				<view v-for="(item,index) in chatMsg"  :key=index>
					<view class="item flex-row" :class="item.position">
					<image v-if="item.position=== 'left'" src="../../static/face.png" class="face"></image>
					<image v-else src="../../static/natural.png" class="face"></image>
					<text class="content flex-row" :class=item.position user-select="true" >{{item.msg}} </text>
					</view>
				</view>
				
				<view id="bottom"></view>	
			</scroll-view>
			
		</view>
		<view class="text-btn">
			<view style="width: 600rpx;" >
				<uni-easyinput class="uni-mt-5 input-box" trim="both" v-model="value" placeholder="请输入内容" type="text"  @focus="scrollToBottom":clearable="false"   >
				</uni-easyinput>
			</view>
			<view class="send-btn" hover-class="send-btn-click" @click="sendClick">
				<uni-icons type="paperplane-filled" size=30 color="#4285f4" ></uni-icons>
				<text class="btn-text">发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				scrollHeight:'auto',
				scrollView:'default',
				isFocus:false,
				content:'',
				value:'',
				chatMsg:[
					{
						position:'left',
						msg:"欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
					},
					
				]
				
			}
		},
		onLoad() {
			this.setScrollHeight()
			
			uni.getSystemInfo({
				success: res=>{
					this.statusBarHeight = res.statusBarHeight
				}
			})
		},
		methods: {
			showDrawer() {
							this.$refs.showRight.open();
						},
						closeDrawer() {
							this.$refs.showRight.close();
						},
			inputFocus(e){
				this.setScrollHeight(e.detail.height)
				this.scrollToBottom()
				
				uni.onKeyboardHeightChange(res=>{
					this.setScrollHeight(res.height)
					this.scrollToBottom()
				})
			},
			setScrollHeight(descHeight=0){
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
					position:'right',
					msg:this.value,
				})
				uni.showLoading({
					title:"思考中",
					mask:true,
				})
				uni.request({
					url:"http://123.60.188.11:1655/test",
					method:'POST',
					data:{msg:this.value},
					success:(res) => {
						this.chatMsg.push({
							position:'left',
							msg:res.data,
						})
						this.scrollToBottom()
						uni.hideLoading()
					}
				})
				
				this.scrollToBottom()
				this.value=' '
				
			},
			input(e) {
				console.log("输入内容",e)
			},
			
			
			
			scrollToBottom() {
					setTimeout(()=>{
						this.scrollView = 'bottom'
						setTimeout(()=>{this.scrollView = 'default'}, 100)
					}, 100)
			}
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
			
		}
	}
</script>

<style lang="scss">
	.container{
		height: 100vh;
		overflow: hidden;
	}
	.flex-row{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
.scroll{
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
	
	.item-space{
		height: 30upx;
	}
	.item{
		margin: 0 30upx 30upx;
		align-items: flex-start;
		justify-content: flex-start;
		
		.face{
			width: 80upx;
			height: 80upx;
			border-radius: 10upx;
		}
		
		.content{
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
			
			&::before{
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
		
		&.left{
			.face{
				margin-right: 30upx;
			}
			.content::before{
				left: -20upx;
			}
		}
		
		&.right{
			flex-direction: row-reverse;
			.face{
				margin-left: 30upx;
			}
			.content{
				background-color: #A0EA6F;
				
				&::before{
					right: -20upx;
					transform: rotate(180deg);
					border-right: 30upx solid #A0EA6F;
				}
			}
		}
	}
	
	#bottom{
		height: 0;
	}
}
.oper{
	height: 110upx;
	padding: 0 20upx;
	box-sizing: border-box;
	border-top: 2upx solid #EEE;
	border-bottom: 2upx solid #EEE;
	
	.input{
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
		height:80upx;
		width:80upx;
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
		border:solid;
		border-radius: 10rpx;
		border-color: #4285f4;
		flex:auto;
		display:flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.send-btn-click {
		background-color: #fffae8;
		
	}
	.btn-text {
		font-size: 2ch;
		color:#4285f4 ;
	}
	.shift-table{
		display: flex;
		flex-direction: row;
		
	}
	.in-button{
		width: 10rpx;
		color:red
	}
	.out-button{
		flex:1 0 auto
	}
</style>
