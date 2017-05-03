<template>
	<div class="content" v-if="showMe">
		<div class="tip" v-if="!suportBroser">Geolocation is not supported by this browser.</div>
		<search></search>
		<section class="list">
			<table class="table">
				<thead class="f26">
					<tr>
						<th></th>
						<th class="name">名称</th>
						<th class="sort" :class="{'current': current.key=='Surplus'}" @click="sort('Surplus')">余量<span class="asds"><i class="asc" :class="{'active': current.value === 1}"></i><i class="desc" :class="{'active': current.value === 0}"></i></span></th>
						<th class="sort" :class="{'current': current.key=='Distance'}" @click="sort('Distance')">距离<span class="asds"><i class="asc" :class="{'active': current.value === 1}"></i><i class="desc" :class="{'active': current.value === 0}"></i></span></th>
						<th></th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="item in items" @click="select(item)">
						<td><div :class="{'point': item.DeliveryStatus===1}"></div></td>
						<td><div class="box">{{ item.ShopName }}</div></td>
						<td>{{ item.Surplus }}%</td>
						<td>{{ item.Distance }}m</td>
						<td><div></div></td>
					</tr>
				</tbody>
				<tfoot v-if="items.length == 0" class="f24">
					<tr><td colspan="5">看完辣，别拉了(; >_<)</td></tr>
				</tfoot>
			</table>
		</section>
	</div>
</template>
<script>
	import search from 'components/search'
	import { Request } from 'service/requests' 
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default{
		name: 'distance',
		data(){
			return {
				showMe: true,
				items: [],
				suportBroser: true,
				x: 0,
				y: 0,
				current: { key: '', value: 0},
				allItems: []
			}
		},
		components: {
			search
		},
		methods: {
			...mapActions(['setLoading']),
			...mapGetters(['getCurrentUser']),
			GetDistanceList(){
				this.items = this.allItems.filter((x)=>{
		 			return x.ShopName.indexOf(this.name)>-1
		 		});
		 		if(this.user.UserId){
			 		this.items = this.items.filter((x)=>{
			 			return x.DeliveryManId  == this.user.UserId
			 		});
		 		}
			},
			select(item){
				this.$router.replace({path: '/shopInfo', query: { id: item.ShopId }});
			},
			getLocation(){
				// function showPosition(position){
				// 	this.x = position.coords.latitude;
				// 	this.y = position.coords.longitude;
					// this.setLoading(true);
					// Request.GetDistanceList().then((data)=>{
					// 	this.items = data;
					// 	this.allItems = data;
					// 	this.setLoading(false);
					// 	this.GetDistanceList();
					// });
				// }
				// if (navigator.geolocation)
			 //    {
			 //    	navigator.geolocation.getCurrentPosition(showPosition);
			 //    }else{
			    	// this.suportBroser = false;
			    // }
			},
		  	 sort(key){
		  	 	if(this.current.key === key){
		  	 		this.current.value = !this.current.value * 1;
		  	 	}else{
		  	 		this.current.key = key;
		  	 		this.current.value = 1;
		  	 	}
		  	 	for(let i = 0; i< this.items.length-1; i++){
		  	 		for(let j=i + 1; j< this.items.length; j++){
		  	 			if(this.current.value)//true为升序1
		 				{
		 					if(this.items[i][key] > this.items[j][key]){
			  	 				let temp = this.items[i][key];
			  	 				this.items[i][key] = this.items[j][key];
			  	 				this.items[j][key] = temp;
			  	 			}
		 				}else{
		 					if(this.items[i][key] < this.items[j][key]){
			  	 				let temp = this.items[i][key];
			  	 				this.items[i][key] = this.items[j][key];
			  	 				this.items[j][key] = temp;
			  	 			}
		 				}
		  	 		}
		  	 	}
		  	 }
		},
		computed: mapState({
			name: state => state.shop.name,
			user: state => state.shop.user
		}),
		watch: {
		  	name: function(){
		  		this.GetDistanceList();
		  	},
		  	user: function(){
		  		this.GetDistanceList();
		  	}
		},
		created(){
			// this.getLocation();
			this.setLoading(true);
			Request.GetDistanceList({}, this.getCurrentUser()).then((data)=>{
				this.items = data;
				this.allItems = data;
				this.setLoading(false);
				this.GetDistanceList();
			});
		}
	}
</script>
<style  lang="less" scoped>
	@import '../styles/common';
	.list{
		.px2rem(margin-top, 140);
		background-color: #fff;
		.table{
			width: 100%;
			tbody tr{
				border-top: 1px solid #d8d8d8;
			}
			td, th{
				padding: .4rem 0;
				text-align: center;
				vertical-align: middle;
				width: 20%;
				&:first-child{
					width: 10%;
				}
				&:last-child{
					width: 10%;
					div{
						.px2rem(width, 14);
						.px2rem(height, 26);
						background: url('../assets/sm-right.png') no-repeat center center / .186rem .346rem;
					}
				}
			}
			.name{
					width: 40%;
				}
			.box{
				padding: 0 .4rem;
				display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
			    overflow: hidden;
			}
			.f24{
				.font-height(16);
			}
			.sort{
				position: relative;
				.asds{
					position: absolute;
					padding-left: 5px;
					.asc,.desc{
						display: block;
						width: 0; 
						height: 0; 
						margin: 2px auto;
					}
					.asc{
						border-left: 4px solid transparent; 
						border-right: 4px solid transparent; 
						border-bottom: 4.656px solid #b5b5b5;
					}
					.desc{
						border-left: 4px solid transparent; 
						border-right: 4px solid transparent; 
						border-top: 4.656px solid #b5b5b5;
					}
					
				}
			}
			.current{
				color: @baseFontColor;
				.asc.active{
					border-bottom-color: @baseFontColor
				}
				.desc.active{
					border-top-color: @baseFontColor
				}
			}
			.point{
				margin: 0 auto;
				content: "";
				height: 6px;
				width: 6px;
				border-radius: 50%;
				background-color: @baseFontColor;
			}
		}
	}
	.tip{
		padding: .4rem;
		background-color: #fcf8e3;
	}
</style>