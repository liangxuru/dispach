<template>
    <div class="bg part">
	    <div class="unbind f26">
	        <span>当前绑定账号：<i>{{ UserName }}</i></span>
	    </div>
	    <button class="login_button" @click="logout">
			解除绑定
		</button>
	</div>
</template>
<script>
	import { Request } from 'service/requests'
	import { mapState, mapActions } from 'vuex'
	import { WebStorageCache } from 'lib/StorageCache'
	export default {
		name: 'logOut',
		data(){
			return {
				UserName:''
			}
		},
		mounted: function(){
			this.UserName = WebStorageCache.get("token").UserName;
		},
		methods: {
			...mapActions(['setLoading']),
			logout: function(){
	      		this.setLoading(true);
	      		Request.LoginOut();
        		WebStorageCache.remove("token");
        		setTimeout(()=>{
        			this.$router.push('/login');
        		}, 1500);
        		this.setLoading(false);
			}
		}
	}
</script>
<style scoped>
	.part{
		padding: .8rem .4rem;
	}
	.unbind{
		width: 90%;
		margin: 0 auto;
		padding: .4rem;
		border: 1px solid #e9e9e9;
		background-color: #f0f3f2;
		border-radius: 6px;
    	box-sizing: border-box;
	}
</style>