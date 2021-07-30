<template>
	<view class="my-search-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck">全选</radio>
		</label>
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="btn-settle" @click="settlement">
			结算({{total}})
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['isFullCheck','checkedGoodsAmount','total'])
			
		}
	}
</script>

<style lang="scss">
 .my-search-container{
	 position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
 }
 
	 .radio{
		  display: flex;
		  align-items: center;
	 }
	 .amount-box{
		 .amount{
			 color: #c00000;
			 font-weight: bold;
		 }
	 }
	 .btn-settle{
	 	 background-color: #c00000;
	 	 height: 50px;
	 	 color: white;
	 	 line-height: 50px;
	 	 padding: 0 10px;
	 	 min-width: 100px;
	 	 text-align: center;
 }
</style>
