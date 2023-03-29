<template>
	<view class="drawer-container">
		

			<uni-drawer ref="showRight" mode="right" :mask-click="false">
				<scroll-view style="height: 50%;" scroll-y="true">
					<view class="shift-table" v-for="(item,index) in 5" :key="item">
						<button size="mini" class="out-button" @click="chooseConversation(index+1)">conversation{{ item }}</button>
						<button size="mini" class="in-button" @click="confirmDel(index+1)">x</button>
						</view>
						<button size="mini" class="new-button">new conversation</button>
						<button size="mini" class="single-chat">单轮次对话</button>
				</scroll-view>
			</uni-drawer>
	
	</view>
</template>

<script>
	export default{
		data() {
			return{
				
			}
		},
		methods:{
			confirmDel(cov_id){
				//单轮次对话只
				uni.showModal({
					title: '提示',
					content: `确定要删除 conversation${cov_id} 吗？`,
					success: function (res) {
						if (res.confirm) {
							//清除Stroge中的内容，自动切换当前对话到下一个存在的conversation，如果不存在，则什么都不显示
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				this.$refs.showRight.close();
			},
			chooseConversation(cov_id){
				uni.showToast({
					title:`conversation${cov_id}`,
					image:'static/sucess.png',
					icon:'none',
					duration:1000
				})
				this.$refs.showRight.close();
				//从Sroge中取出数据，进行渲染
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			
		}
	}
</script>

<style>
	.shift-table{
		display: flex;
		flex-direction: row;
		
	}
	.in-button{
		width: 10rpx;
		color:red;
		text-align: center;
		margin-top:5rpx;
		
	}
	.out-button{
		flex:1 0 auto;
		margin-top:5rpx;
	}
	.new-button{
		margin-top: 20rpx;
		width: 100%;
		background-color: #79c18a;
		color:white
	}
	.single-chat{
		width: 100%;
	}
</style>