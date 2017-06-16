<template>
	<div class="content" v-if="showMe">
		<search v-bind:showMenu="false"></search>
		<section class="list">
			<div class="f26 title sub">{{spname}}</div>
			<table class="table">
				<thead class="f26">
					<tr class="bg">
						<th></th>
						<th>名称</th>
						<th>余量</th>
						<th>上货量</th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="(item, index) in items" class="bg" :class="item.clicked?'clicked':''" @click="checked(item, $event)">
						<td>{{ index + 1 }}</td>
						<td><div class="box">{{ item.ProductName }}</div></td>
						<td>{{ item.RemainderAmount }}</td>
						<td><a class="subs" @click="sub(item, $event)"></a><input type="text" v-model="item.RecommendOnShelvesAmount" :value="item.FullAmount" size="5" maxlength="5" @keyup='item.RecommendOnShelvesAmount=item.RecommendOnShelvesAmount.replace(/\D/gi,"")' /><a class="add" @click="add(item, $event)"></a></td>
					</tr>
				</tbody>
				<tfoot v-if="items.length == 0" class="f24">
					<tr><td colspan="3">看完辣，别拉了(; >_<)</td></tr>
				</tfoot>
			</table>
		</section>
		<section class="empty"></section>
		<section class="footer" @click="confirm()" v-if="showBtn">
			<a class="btn">上货完成</a>
		</section>
		<modal v-bind:title="modalTitle" v-bind:showCover.sync="showCover"></modal>
	</div>
</template>
<script>
	import search from 'components/search'
	import modal from 'components/modal'
	import { Request } from 'service/requests' 
	import { mapState, mapActions } from 'vuex'
	import { default as message } from 'lib/message'
	export default {
		name: 'productOn',
		data(){
			return {
				showMe: true,
				allItems: [],
				items: [],
				id: 0,
				showBtn: true,
				spname: '',
				showCover: false,
				modalTitle: "确定上货完成？"
			}
		},
		components: {
			search,
			modal
		},
		computed: mapState({
			name: state => state.shop.name
		  }),
		  watch: {
		  	name: function(){
		  		this.GetProductList();
		  	}
		},
		methods: {
			...mapActions(['setLoading']),
			add(item, event){
				item.RecommendOnShelvesAmount ++;
				event.stopPropagation();
			},
			sub(item, event){
				item.RecommendOnShelvesAmount>0 && item.RecommendOnShelvesAmount--;
				event.stopPropagation();
			},
			GetProductList(){
				this.items = this.allItems.filter(function(x){
					return x.ProductName.indexOf(this.name)>-1
				}.bind(this));

				this.showBtn = this.items.length>0;
			},
			confirm(){
				this.showCover = true;
			},
			loadData(){
				this.setLoading(true);
				Request.OnShelvesProducts({
					shopid: this.id
				}).then((data)=>{
					this.items = data;
					this.allItems = data;
					this.GetProductList();
					this.setLoading(false);
				});
			},
			checked(item){
				this.$set(item, "clicked", !item.clicked);
			},
			ok(){
				this.setLoading(true);
				this.showBtn = false;
				//确定下架操作
				let newItems = [];
				this.items.map((item, i)=>{
					newItems.push({
						ProductId: item.ProductId,
						ProductName: item.ProductName,
						ProductCount: item.RecommendOnShelvesAmount,
						RemainCount: item.RemainderAmount
					});
				});
				
				Request.OperationProducts({
					ShopId: this.id,
					ProductList: newItems,
					OperationType: 0
				}).then((data)=>{
					message.success("上货成功！");
					// this.loadData();
					setTimeout(()=>{
						this.setLoading(false);
						this.$router.replace({path: '/distanceList'});
					}, 1000);
				});
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.spname = this.$route.query.name;
			this.loadData();
		}
	}
</script>
<style  lang="less" scoped>
	@import '../styles/common';
	.list{
		.px2rem(margin-top, 140);
		.table{
			width: 100%;
			tbody tr{
				border-top: 1px solid #d8d8d8;
				&.clicked{
					background-color: #eee;
				}
			}
			td, th{
				padding: .4rem 0;
				text-align: center;
				vertical-align: middle;
				width: 30%;
				&:first-of-type{
					width: 5%;
				}
				&:last-of-type{
					width: 35%;
				}
			}
			.box{
				padding: 0 .4rem;
				.font-height(13);
				display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
			    overflow: hidden;
			}
			.current{
				color: @baseFontColor;
			}
			.subs,.add{
				display: inline-block;
				.px2rem(height, 50);
				.px2rem(width, 50);
				background-position: center;
				.px2rem(background-size, 50);
				background-repeat: no-repeat;
			}
			.subs{
				background-image: url('../assets/sub.png');
			}
			.add{
				background-image: url('../assets/add.png');
			}
			input{
				.px2rem(width, 90);
				.px2rem(height, 50);
				.px2rem(line-height, 50);
				.px2rem(border-radius, 6);
				.px2rem(margin-left, 20);
				.px2rem(margin-right, 20);
				border: 1px solid #efefef;
				position: relative;
			    top: -9px;
			    text-align: center;
			}
		}
	}
</style>