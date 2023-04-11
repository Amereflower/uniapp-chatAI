<template>
	<view class="drawer-container">


		<uni-drawer ref="showRight" mode="right" :mask-click="false">
			<scroll-view style="height: 50%;" scroll-y="true">
				<view class="shift-table" v-for="(item,index) in chatNum" :key="item">
					<button size="mini" :class={selected:isSelected(item)} class="out-button"
						@click="chooseConversation(index+1)">conversation{{ item }}</button>
					<button size="mini" class="in-button" @click="confirmDel(index+1)">x</button>
				</view>
				<button size="mini" class="new-button" @click="getConversationId">new conversation</button>
				<button size="mini" :class={selected:isSingleOpen} class="single-chat" @click="singleQuestion()">{{typeChoose}}</button>

				<button @click="checkStorage">检查缓存内容</button>
			</scroll-view>
		</uni-drawer>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatNum: 0,
				chooseNum: 1,
				typeChoose:'单轮次对话',
				isSingleOpen:false

			}
		},
		created: function() {
			// uni.removeStorageSync('chat_history');
			this.chatNum = 1
			uni.request({
				url: 'http://123.60.141.75:1655/getconverid',
				method: 'GET',
				success: (res) => {
					uni.setStorageSync('chat_history',[{
							'id': res.data,
							'chatMsg': [{
								position: 'left',
								msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
							}]
						}, ])
						
					this.$emit('change-conver-id', 1)
				}
			})
			
		},
		methods: {
			confirmDel(cov_id) {
				//删除了要自动切换到另一组对话。。
				uni.showModal({
					title: '提示',
					content: `确定要删除 conversation${cov_id} 吗？`,
					success: function(res) {
						if (res.confirm) {
							//清除Stroge中的内容，自动切换当前对话到下一个存在的conversation，如果不存在，则什么都不显示
							response = uni.getStorageSync('chat_history')
							const chatData = response
							chatData.splice(cov_id-1,1)
							this.chooseNum=1
							uni.setStorageSync('chat_history',chatData)
							this.chatNum--
							this.$emit('delete-conver', 0)

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				this.$refs.showRight.close();
			},
			chooseConversation(cov_id) {
				this.isSingleOpen=false
				this.$emit('single', false)
				
				console.log("点击对话的时传递的参数是"+cov_id)
				this.chooseNum = cov_id;
				uni.showToast({
					title: `conversation${cov_id}`,
					image: 'static/sucess.png',
					icon: 'none',
					duration: 1000
				})
				this.$refs.showRight.close();

				this.$emit('change-conver-id', cov_id)
				//从Sroge中取出数据，进行渲染
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			singleQuestion() {
				this.isSingleOpen=true
				this.$emit('single', true)
				this.chooseNum=-1
				
				this.$refs.showRight.close();
				
			},
			getConversationId() {
				let chatData
				uni.request({
					url: 'http://123.60.141.75:1655/getconverid',
					method: 'GET',
					success: (res) => {
						const conv_id = res.data
						const response = uni.getStorageSync('chat_history')
						chatData = response
						chatData.push({
							'id': conv_id,
							'chatMsg': [{
								position: 'left',
								msg: "欢迎使用chatGPT聊天机器人，我是AI，开始使用吧！"
							}]
						})
						this.chatNum++
						
						uni.setStorageSync('chat_history',chatData)

					}
				})
				this.$refs.showRight.close()
			},
			checkStorage() {
				console.log('对话总数为', this.chatNum)
				uni.getStorageSync({
					key: 'chat_history',
					success: function(res) {
						console.log(res.data[0].id)
					}
				})
			},
			isSelected: function(index) {
				if (index === this.chooseNum) {
					return true;
				} else {
					return false;
				}
			}

		},
		computed: {

		}
	}
</script>

<style>
	.shift-table {
		display: flex;
		flex-direction: row;

	}

	.in-button {
		width: 10rpx;
		color: red;
		text-align: center;
		margin-top: 5rpx;

	}

	.out-button {
		flex: 1 0 auto;
		margin-top: 5rpx;
	}

	.new-button {
		margin-top: 20rpx;
		width: 100%;
		background-color: #79c18a;
		color: white
	}

	.single-chat {
		width: 100%;
	}

	.selected {
		background-color: #79c18a;
	}
</style>