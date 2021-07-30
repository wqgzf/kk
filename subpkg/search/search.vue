<template>
	<view>
		<view class="search-box">
			<uni-search-bar @confirm="search" :radius="100" @cancel="sc" cancelButton="none"  @input="input" ></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="serchResults">
			<view class="sugg-item" v-for="(item,i) in serchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<nui-icons type="arrowright" size="16"></nui-icons>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historylist" :key="i" @click="gotGoodList(item)"></uni-tag>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kw:'',
				serchResults:[],
				timer:null,
				historylist:uni.getStorageSync("historylist")||[]
			}
		},
		methods: {
			gotGoodList(item){
				uni.navigateTo({ 
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			},
			sc(){
				this.serchResults=[]
			},
			clean(){
				this.historylist=[]
				uni.setStorageSync('historylist',[])
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			input(e){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.kw=e
					this.getSearchList()
				},500)
				
			},
			saveSearch(){
			let index=this.historylist.findIndex(item=>{
					return item==this.kw
				})
				if(index!=-1){
					this.historylist.splice(index,1)
				}
				if(this.kw!==''){
					this.historylist.unshift(this.kw);
					uni.setStorageSync("historylist",this.historylist)
				}
				
			},
		async	getSearchList(){
				const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				console.log(res)
				this.serchResults=res.message
				this.saveSearch()
			}
		},onLoad(){
			this.getSearchList()
		}
	}
</script>



<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>

