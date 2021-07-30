<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" v-if="showRadio" @click="radioClick" color="#c00000"></radio>
			<image class="goods-pic" :src="goods.goods_small_logo||defaultPic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price}}</view>
				<uni-number-box @change="numChange" :min="1" :value="goods.goods_count" v-if="showNum"></uni-number-box>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: ''
			}

		},
		methods: {
			radioClick() {
				// console.log(e)
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChange(e) {
				// console.log(e)
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:e
				})
			}
		}
	}
</script>



<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
}

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			
		}
.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			
		
	}
	.goods-name {
		font-size: 13px;
	}
	.goods-info-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		
	
	}
	.goods-price {
		color: #C00000;
		font-size: 16px;
	}
</style>
