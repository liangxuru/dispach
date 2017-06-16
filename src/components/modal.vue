<template>
	<div>
		<section class="shelves" v-if="showCover">
			<div class="f30 title">{{ title }}</div>
			<div><a class="btn" @click="confirm()">确定</a></div>
			<div><a class="btn-empty" @click="cancel()">取消</a></div>
		</section>
		<section class="cover" v-if="showCover" @click="close()"></section>
	</div>
</template>
<script>
	export default {
		name: 'modal',
		props: ["title", "showCover"],
	  	methods: {
	  		confirm(){
	  			this.$parent.ok();
	  			this.$parent.showCover = false;
	  		},
	  		cancel(){
	  			this.$parent.showCover = false;
	  		},
	  		close(){
	  			this.$parent.showCover = false;
	  		}
	  	}
	}
</script>
<style lang="less" scoped>
	.shelves{
		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		right: 0;
		padding: .4rem;
		background-color: #fff;
		.title{
			text-align: center;
		}
		div{
			margin-top: .4rem;
		}
	}
</style>