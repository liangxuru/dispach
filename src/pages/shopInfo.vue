<template>
	<div class="content" v-if="showMe">
		<search v-bind:showMenu="false"></search>
		<section class="list">
			<table class="table">
				<thead class="f26">
					<tr>
						<th>名称</th>
						<th>饱和量</th>
						<th>余量</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="item in items">
						<td><div class="box">{{ item.ProductName }}</div></td>
						<td>{{ item.FullAmount }}</td>
						<td>{{ item.RemainderAmount }}</td>
						<td @click="Offshelves(item)"><a class="btn-sm">下架</a></td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="empty"></section>
		<section class="footer">
			<div><a class="btn" v-bind:href="`#/productOn?id=${id}`">上货</a></div>
			<div><a class="btn" v-bind:href="`#/productCheck?id=${id}`">盘点</a></div>
		</section>
		<section class="shelves" v-if="shelves">
			<div class="f30">{{ info.ProductName }}</div>
			<div class="count f26"><span>下架数量</span><span><input type="text" :value="info.RemainderAmount" /></span></div>
			<div class="select f26" @click="select()"><i :class="{'selected': OperationType === 3}"></i><span>将该商品状态变为下架</span></div>
			<div><a class="btn" @click="confirm()">确定</a></div>
		</section>
		<section class="cover" v-if="shelves" @click="Closeshelves()"></section>
	</div>
</template>
<script>
	import search from 'components/search'
	import { Request } from 'service/requests' 
	import { mapState, mapActions } from 'vuex'
	import { default as message } from 'lib/message'
	export default {
		name: 'shopInfo',
		data(){
			return {
				showMe: true,
				shelves: false,
				info: {},
				OperationType: 2,
				id: 0
			}
		},
		components: {
			search
		},
		methods: {
			GetProductList(){
				// Request.GetProductList({
				// 	name: this.name,
				// 	id: this.user.id,
				// 	spid: this.id
				// }).then((data)=>{
				// 	this.items = data;
				// });
				this.items = [{
					ProductId: 1, 
					ProductName: "健力宝",
					FullAmount: 4,
					RemainderAmount: 4
				},{
					ProductId: 2,
					ProductName: "红牛",
					FullAmount: 5,
					RemainderAmount: 5
				}];
			},
			Offshelves(item){
				//下架
				this.shelves = true;
				this.info = item;
			},
			Closeshelves(){
				this.shelves = false;
			},
			confirm(){
				//确定
				Request.Offshelves({
					product: this.info,
					OperationType: this.OperationType
				}).then((data)=>{
					message.success(data);
					this.shelves = false;
				});
			},
			select(){
				this.OperationType = 5 - this.OperationType;
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.GetProductList();
		}
	}
</script>
<style  lang="less" scoped>
	@import '../styles/common';
	.list{
		.px2rem(margin-top, 20);
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
	.shelves{
		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		right: 0;
		padding: .4rem;
		background-color: #fff;
		.count{
			margin-top: .4rem;
			margin-bottom: .8rem;
			span{
				&:first-child{
					.px2rem(margin-right, 20);
				}
			}
			text-align: center;
		}
		input{
			.px2rem(width, 400);
			.px2rem(height, 80);
			.px2rem(line-height, 80);
			border: 1px solid #efefef;
			.px2rem(border-radius, 6);
			text-align: center;
		}
		.select{
			margin-bottom: .8rem;
			.px2rem(padding-left, 40);
			i{
				display: inline-block;
				width: .426rem;
				height: .426rem;
				.px2rem(margin-right, 20);
				vertical-align: -3px;
				&:before{
					content: "";
					display: block;
					width: .426rem;
					height: .426rem;
					background: url('../assets/select.png') no-repeat center center / .426rem .426rem;
				}
			}
			i.selected{
				&:before{
					background-image: url('../assets/selected.png');
				}
			}
		}
	}
</style>