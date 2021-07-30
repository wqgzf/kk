<template>
	<view v-if="goods_info.goods_name" class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick"
				@click="onClick"></uni-goods-nav>
		</view>

	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				goods_info: [],
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			onClick(e) {
				// console.log(e)
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				// console.log(e)
				if (e.content.text === '加入购物车') {
					const goods={
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true,
					}
				var cart=uni.getStorageSync("cart")
				if(cart==null){
					cart=[]
				}
				this.addToCart(goods)
				}
			},
			preview() {

			},
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goods_info = res.message
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id);
			console.log(this.goods_info)
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>
