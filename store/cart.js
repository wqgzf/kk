export default{
	namespaced:true,
	state:{
		cart:uni.getStorageSync('cart')||[]
	},
	actions:{
		
	},
	getters:{
		isFullCheck(state){
			var length1=state.cart.length;
			var length2=state.cart.filter(x=>x.goods_state).length;
			return length1==length2
		},
		total(state){
			var count=0;
			state.cart.forEach(x=>{
				if(x.goods_state)
				count+=x.goods_count
			})
			return count;
			},
		checkedGoodsAmount(state){
				var count=0;
				state.cart.forEach(x=>{
					if(x.goods_state){
						count+=x.goods_count*x.goods_price
					}
					
				})
				return count;
			}
	},
	mutations:{
		updateGoodsState(state,goods){
			const findResult=
			state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_state=goods.goods_state
				uni.setStorageSync("cart",state.cart)
			}
			// console.log(findResult.goods_state)
		},
		updateGoodsCount(state,goods){
			// console.log(goods)
			const findResult=
			state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count
				uni.setStorageSync("cart",state.cart)
			}
		},
		addToCart(state,goods){
			// console.log(goods)
			const findResult=
			state.cart.find(x=>x.goods_id===goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			uni.setStorageSync('cart',state.cart)
		}
		
	}
}