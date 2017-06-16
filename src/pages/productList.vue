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
						<th>推荐捡货量</th>
						<th>实际捡货量</th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="(item, index) in items" class="bg" :class="item.clicked?'clicked':''" @click="checked(item, $event)">
						<td>{{ index + 1 }}</td>
						<td><div class="box">{{ item.ProductName }}</div></td>
						<td>{{ item.AllSaleAmount }}</td>
						<td><a class="subs" @click="sub(item, $event)"></a><input type="text" v-model="item.PickAmount" size="5" maxlength="5" @keyup='item.PickAmount=item.PickAmount.replace(/\D/gi,"")'><a class="add" @click="add(item, $event)"></a></td>
					</tr>
				</tbody>
				<tfoot v-if="items.length == 0" class="f24">
					<tr><td colspan="3">看完辣，别拉了(; >_<)</td></tr>
				</tfoot>
			</table>
		</section>
		<section class="empty" v-if="showBtn"></section>
		<section class="footer" v-if="showBtn">
			<div @click="confirm(2)"><a class="btn">分批拣货</a></div>
			<div @click="confirm(1)"><a class="btn">确认完成</a></div>
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
		name: 'productList',
		data(){
			return {
				showMe: true,
				allItems: [],
				items: [],
				id: 0,
				time: '',
				now: '',
				showBtn: true,
				spname: '',
				type: 0,
				showCover: false,
				modalTitle: ""
			}
		},
		components: {
			search,
			modal
		},
		computed: {
			...mapState({
				name: state => state.shop.name,
				user: state => state.shop.user
			})
		},
		watch: {
		  	name: function(){
		  		this.GetProductList();
		  	}
		},
		methods: {
			...mapActions(['setLoading']),
			add(item, event){
				item.PickAmount ++;
				event.stopPropagation();
			},
			sub(item, event){
				item.PickAmount>0 && item.PickAmount--;
				event.stopPropagation();
			},
			checked(item){
				this.$set(item, "clicked", !item.clicked);
			},
			GetProductList(){
				this.items = this.allItems.filter(function(x){
					return x.ProductName.indexOf(this.name)>-1
				}.bind(this));

				this.showBtn = this.items.length>0;
			},
			ok(){
				this.setLoading(true);
				let newItems = [];
				this.items.map((item,i)=>{
					newItems.push({
						ProductId: item.ProductId,
						ProductName: item.ProductName,
						ProductCount: item.PickAmount,
						AllSaleAmount: item.AllSaleAmount
					});
				});

				Request.PickProduct({
					shopid: this.id,
					ProductList: newItems,
					PickStartTime: this.now,
					type: this.type
				}).then((data)=>{
					this.showBtn = false;
					message.success("捡货成功");
					setTimeout(()=>{
						this.setLoading(false);
						this.$router.replace({path: '/shopList'});
					}, 1000);
				});
			},
			confirm(type){
				this.modalTitle = type == 1?"确认完成？":"确认分批拣货？";
				this.type = type;
				this.showCover = true;
			},
			changeSta(value){
				value = 10;
			}
		},
		created(){
			let now = new Date();
			this.id = this.$route.query.id;
			this.time = this.$route.query.time;
			this.spname = this.$route.query.name;
			this.now = [now.getFullYear(), now.getMonth()+1, now.getDate()].join('/') + ' ' + [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
			this.setLoading(true);
			Request.GetProductList({
				shopid: this.id,
				pickTime: this.now,
				lastPickTime: this.time.replace(/T/, ' ')
			}).then((data)=>{
				this.allItems = data;
				this.items = data;
				this.GetProductList();
				this.setLoading(false);
			});
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
				&:last-of-type{
					border-bottom: 1px solid #d8d8d8;
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
	.footer{
		display: flex;
		div{
			display: inline-block;
			flex: 1;
			.px2rem(margin-right, 30);
			.px2rem(width, 315);
			.px2rem(height, 80);
			text-align: left;
			&:last-child{
				margin-right: 0;
			}
		}
	}
</style>