<template>
	<view>
		<view class="search-box">
			<my-search @clickToPage="goPage"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" 
		:duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" >
				<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" @click="navClickHandler(item)" :key="i" >
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" >
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item"
						 v-for="(item2,i2) in item.product_list"
						 :key="i2" v-if="i2!==0" :url='item.url'>
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			}
		},
		methods: {
			goPage(){
				console.log(1)
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
		async getSwiperList(){
			const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
			if(res.meta.status!==200) return uni.$showMsg()
			this.swiperList=res.message
			},
		async	getNavList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200) return uni.$showMsg()
				this.navList=res.message
			},
			navClickHandler(item){
				if(item.name==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
		async	getFloorList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) return uni.$showMsg()
				this.floorList=res.message
			}
		},
		onLoad(){
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},	
	}
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
.left-img-box image{
	height: 391rpx;
}
  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
