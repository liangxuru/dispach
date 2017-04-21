<template>
	<div>
		<header class="nav">
			<div class="search">
				<i class="icon-search" @click="search()"></i>
				<form id="myform" action="" onsubmit="return false;" @search="search()">
					<input type="search" class="f26" placeholder="搜索名字" v-model="name"/>
				</form>
			</div>
			<div class="menu" @click="open()" v-if="showMenu">
				<span class="nav-btn f26">
	                <i class="text-icon"></i>筛选
	            </span>
			</div>
		</header>
		<section v-if="showCover">
			<div class="mask f26">
				<div class="all">
					全部
				</div>
				<ul class="items">
					<li @click="select(item)" v-for="item in items">{{ item.name }}</li>
				</ul>
			</div>
			<div class="floatright" @click="close()"><div></div></div>
		</section>
		<section class="cover" v-if="showCover"></section>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import { Request } from 'service/requests' 
	export default {
		name: 'search',
		props: {
			showMenu: {
				type: Boolean,
				default: true
			}
		},
		data () {
		    return {
			    showCover: false,
			    name: "",
			    items: []
		    }
	  	},
	  	methods: {
	  		...mapActions(['setName', 'setUser']),
	  		open(){
	  			this.showCover = true;
	  		},
	  		close(){
	  			this.showCover = false;
	  		},
	  		select(user){
	  			this.setUser(user);
	  			this.showCover = false;
	  		},
	  		search(){
	  			this.setName(this.name);
	  		}
	  	},
	  	created(){
	  		// Request.GetUsers({
	  		// 	id: 0
	  		// }).then((data)=>{
	  		// 	this.items = data;
	  		// });
	  		this.items = [{
	  			id: 1,
	  			name: "张三"
	  		},{
	  			id: 2,
	  			name: "李四"
	  		}];
	  	}
	}
</script>
<style  lang="less" scoped>
	@import '../styles/common';
	.nav{
		.px2rem(height, 120);
		background-color: #b5b5b5;
		padding: 0 .4rem;
		position: relative;
		display: -webkit-box;
		.menu{
			.px2rem(width, 60);
			color: #fff;
			height: 100%;
			.px2rem(line-height, 120);
			.px2rem(margin-left, 30);
			.nav-btn{
				display: inline-block;
			    line-height: 1;
			    vertical-align: middle;
			    .text-icon{
			    	width: .56rem;
			    	height: .346rem;
			    	display: block;
				    margin: auto;
				    margin-bottom: .12rem;
				    background: url('../assets/menu.png') no-repeat center center / .56rem .346rem;
			    }
			}
		}
		.search{
			flex: 1;
			position: relative;
			.px2rem(height, 80);
			.px2rem(line-height, 80);
			background-color: #fff;
			border-radius: 40px;
			padding: 0 1.2rem 0 .4rem;
			.px2rem(margin-top, 20);	
			.icon-search{
				display: inline-block;
				width: .426rem;
				height: .426rem;
				position: absolute;
				right: .4rem;
				top: 50%;
				margin-top: -.213rem;
				background: url('../assets/search.png') no-repeat center center / .426rem .426rem;
			}
			form{
				height: 100%;
			}
			input{
				width: 100%;
				height: 100%;
				background: rgba(255,255,255,0);
				margin: 0;
				border: 0;
				display: block;
			}
		}
	}
	.mask{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
		.px2rem(width, 580);
		background-color: #efefef;
		.all{
			.px2rem(margin-top, 20);
			.px2rem(margin-bottom, 20);
			padding: .4rem;
			color: @baseFontColor;
			background-color: #fff;
		}
		.items{
			background-color: #fff;
			li{
				padding: .4rem;
				border-bottom:1px solid #efefef;
			}
		}
	}
	.floatright{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		.px2rem(width, 170);
		-moz-animation: arrowRight 1.5s infinite ease-in-out;
	    -o-animation: arrowRight 1.5s infinite ease-in-out;
	    -webkit-animation: arrowRight 1.5s infinite ease-in-out;
	    animation: arrowRight 1.5s infinite ease-in-out;
		div{
			width: .44rem;
			height: .84rem;
			background: url('../assets/bg-right.png') no-repeat center center / .44rem .84rem;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -.42rem;
			margin-left: -.22rem;
		}
	}
	@-moz-keyframes arrowRight {
	    0%,30%{opacity: 0;-moz-transform: translateX(-8px);}
	    60%{opacity: 1;-moz-transform: translateX(0);}
	    100%{opacity: 0;-moz-transform: translateX(10px);}
	}
	@-ms-keyframes arrowRight {
	    0%,30%{opacity: 0;-ms-transform: translateX(-8px);}
	    60%{opacity: 1;-ms-transform: translateX(0);}
	    100%{opacity: 0;-ms-transform: translateX(10px);}
	}
	@-webkit-keyframes arrowRight {
	    0%,30%{opacity: 0;-webkit-transform: translateX(-8px);}
	    60%{opacity: 1;-webkit-transform: translateX(0);}
	    100%{opacity: 0;-webkit-transform: translateX(10px);}
	}
	@keyframes arrowRight {
	    0%,30%{opacity: 0;transform: translateX(-8px);}
	    60%{opacity: 1;transform: translateX(0);}
	    100%{opacity: 0;transform: translateX(10px);}
	}
</style>