<template>
	<div class="content" v-if="showMe">
		<search></search>
		<section class="list">
			<table class="table">
				<thead class="f26">
					<tr>
						<th>名称</th>
						<th class="sort" :class="{'current': current.key=='TotalAmount'}" @click="sort('TotalAmount')">销售额<span class="asds"><i class="asc" :class="{'active': current.value === 1}"></i><i class="desc" :class="{'active': current.value === 0}"></i></span></th>
						<th class="sort" :class="{'current': current.key=='PickTime'}" @click="sort('PickTime')">上次时间<span class="asds"><i class="asc" :class="{'active': current.value === 1}"></i><i class="desc" :class="{'active': current.value === 0}"></i></span></th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="item in items">
						<td><div class="box">{{ item.ShopName }}</div></td>
						<td>{{ item.TotalAmount | currency }}</td>
						<td>{{ date(item.PickTime) }}<br/>{{ time(item.PickTime) }}</td>
						<td><a class="btn-sm f26" v-bind:href="`#/productList?id=${item.ShopId}&time=${item.PickTime}`">捡货</a></td>
					</tr>
				</tbody>
				<tfoot v-if="items.length == 0" class="f24">
					<tr><td colspan="4">看完辣，别拉了(; >_<)</td></tr>
				</tfoot>
			</table>
		</section>
	</div>
</template>
<script>
import search from 'components/search'
import { Request } from 'service/requests' 
import { mapState, mapActions } from 'vuex'
export default {
  name: 'shopList',
  data () {
    return {
	    showMe: true,
	    allItems: [],
	    items: [],
	    current: { key: '', value: 0}
    }
  },
  components: {
  	search
  },
  computed: mapState({
	name: state => state.shop.name,
	user: state => state.shop.user
  }),
  watch: {
  	name: function(){
  		this.GetShopList();
  	},
  	user: function(){
  		this.GetShopList();
  	}
  },
  methods: {
  	 ...mapActions(['setLoading']),
  	 GetShopList(){
  	 	this.items = this.allItems.filter((x)=>{
 			return x.ShopName && x.ShopName.indexOf(this.name)>-1
 		});
 		if(this.user.UserId){
	 		this.items = this.items.filter((x)=>{
	 			return x.PickManId == this.user.UserId
	 		});
 		}
  	 },
  	 sort(key){
  	 	if(this.current.key === key){
  	 		this.current.value = !this.current.value * 1;
  	 	}else{
  	 		this.current.key = key;
  	 		this.current.value = 1;
  	 	}
  	 	this.items.sort((pre, next)=>{
  	 		if(this.current.value){//true为升序1
  	 			return pre[key] > next[key];
  	 		}else{
				return pre[key] < next[key];
  	 		}
  	 	});
  	 },
  	 date(value){
  	 	let date = new Date(value);
  	 	return [date.getMonth()+1, date.getDate()].join('/');
  	 },
  	 time(value){
  	 	let date = new Date(value);
  	 	return [date.getHours(), date.getMinutes()].join(':');
  	 }
  },
  created(){
  	this.setLoading(true);
  	Request.GetShopList().then(function(data){
  		this.allItems = data;
 		this.items = data;
 		this.GetShopList();
 		this.setLoading(false);
  	}.bind(this));
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
				&:first-of-type{
					width: 40%;
				}
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
			.box{
				padding: 0 .4rem;
				display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
			    overflow: hidden;
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
			.f24{
				.font-height(16);
			}
		}
	}
</style>