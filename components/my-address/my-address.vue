<template>
	<view>
		<view class="address-choose-box" >
			<button type="primary" size="mini" @click="chooseAddress" class="btnChooseAddress">请选择收货地址+</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},methods:{
			chooseAddress(){
				uni.chooseAddress({
					success:res=>{
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-border{
		display: block;
		width: 100%;
		height: 5px;
	}
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box{
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1{
			display: flex;
			justify-content:space-between;
			.row1-right{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		
	}
	.row2{
		display: flex;
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
	}
</style>
