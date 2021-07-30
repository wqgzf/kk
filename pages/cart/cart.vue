<template>
	<view>
		<view class="cart-container" v-if="cart.length!==0">
			<my-address></my-address>
			
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(goods,i) in cart" :key="i">
					<uni-swipe-action-item @click="swopeItem(goods)" :options="options">
						<my-goods @radio-change="radiochang" @num-change="numberCh" :goods="goods" :showNum="true" :showRadio="true"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
		
		
		
		<view class="empty-cart" v-else>
			<image src="https://z3.ax1x.com/2021/07/29/WHNYhF.jpg" class="empty-img"></image>
			<text class="tip-text">空空如也~</text>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex' 
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
			options:[
			        {
			            text: '删除',
			            style: {
			                backgroundColor: '#c00000'
			            }
			        }
			      ]
			}
		},
		methods: {
			...mapMutations('m_cart',['updateGoodsCount','updateGoodsState']),
			radiochang(e){
				this.updateGoodsState(e)
			},
		numberCh(e){
			// console.log(e)
			this.updateGoodsCount(e)
		}
		},
		computed:{
			...mapState('m_cart',['cart'])
			
			
		}
	}
</script>


<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #EFEFEF;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
