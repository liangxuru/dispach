<template>
	<div class="content" v-if="showMe">
		<search v-bind:showMenu="false"></search>
		<section class="list">
			<table class="table">
				<thead class="f26">
					<tr>
						<th>名称</th>
						<th>余量</th>
						<th>上货量</th>
					</tr>
				</thead>
				<tbody class="f24">
					<tr v-for="item in items">
						<td><div class="box">{{ item.ProductName }}</div></td>
						<td>{{ item.RemainderAmount }}</td>
						<td><a class="subs" @click="sub(item)"></a><input type="text" v-model="item.RecommendOnShelvesAmount" :value="item.FullAmount" /><a class="add" @click="add(item)"></a></td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="empty"></section>
		<section class="footer">
			<a class="btn">上货完成</a>
		</section>
	</div>
</template>
<script>
	import search from 'components/search'
	import { Request } from 'service/requests' 
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'productOn',
		data(){
			return {
				showMe: true,
				allItems: [],
				items: [],
				id: 0
			}
		},
		components: {
			search
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
			add(item){
				item.RecommendOnShelvesAmount ++;
			},
			sub(item){
				item.RecommendOnShelvesAmount>0 && item.RecommendOnShelvesAmount--;
			},
			GetProductList(){
				this.items = this.allItems.filter(function(x){
					return x.ProductName.indexOf(this.name)>-1
				}.bind(this));
			}
		},
		created(){
			this.id = this.$route.query.id;
			Request.OnShelvesProducts({
				shopid: this.id
			}).then((data)=>{
				this.items = data;
				this.allItems = data;
				this.GetProductList();
			});
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
				width: 30%;
				&:last-of-type{
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
			    box-sizing: border-box;
			}
		}
	}
</style>