<template>
	<div class="content">
		跳转中，请稍侯……
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import { WebStorageCache } from 'lib/StorageCache'
	export default {
		name: 'home',
		mounted(){
			let user = WebStorageCache.get("token");
			if(!user["UserName"]){
				this.$router.replace({path: '/login'});
			}else{
				let RoleId = user["RoleId"];
				if(RoleId == 1){
	   				this.$router.replace({path: '/distanceList'});
	   			}else if(RoleId == 2){
	   				this.$router.replace({path: '/shoplist'});
	   			}else if(RoleId == 3){
	   				this.$router.replace({path: '/distanceList'});
	   			}else{
	   				this.$router.replace({path: '/'});
	   			}
			}
		}
	}
</script>