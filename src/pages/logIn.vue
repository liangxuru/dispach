<template>
	<div class="content">
		<div v-if="!state">
			<div class="login_head">
				账号登录
			</div>
			<div class="line_1"></div>
			<div class="login_input">
			<div class="div">
				<label for="user">账号</label><input type="text" name="UserName" placeholder="输入登录账号" v-model="UserName">
			</div>
			<div class="line_2"></div>
			<div class="div">
				<label for="psd">密码</label><input type="password" name="Password" placeholder="输入登录密码" v-model="Password">
			</div>			
			</div>
			<div class="line_1"></div>
			<button class="login_button"  @click="logIn">
				登 录
			</button>
		</div>
		<div v-else>
			<div class="bg part">
			    <div class="unbind f26">
			        <span>当前绑定账号：<i>{{ UserName | lowercase }}</i></span>
			    </div>
			    <button class="login_button" @click="logout">
					解除绑定
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { Request } from 'service/requests'
	import { mapState, mapActions } from 'vuex'
	import { WebStorageCache } from 'lib/StorageCache'
	import { default as message } from 'lib/message'
	export default {
		name: 'logIn',
		data(){
			return {
				state: false, //登录状态
				UserName:'',
				Password:'',
				Role:2
			}
		},
		methods: {
			...mapActions(['setLoading', 'setCurrentUser']),
			logIn:function(){
				if(!this.UserName){
					message.error("输入登录账号");
					return;
				}
				if(!this.Password){
					message.error("输入登录密码");
					return;
				}
	      		this.setLoading(true);
	      		
	      		Request.Login({
	      			UserName: this.UserName,
	      			Password: this.Password,
	      			Role: this.Role
	      		}).then(function(res){
	      			this.setLoading(false);
	      			if(!res) return;
	      			WebStorageCache.remove("token");
	      			WebStorageCache.set("token", {UserId: res.UserId, UserName: res.UserName, RoleId: res.RoleId });
	       			if(res.RoleId == 1){
	       				this.$router.replace({path: '/distanceList'});
	       			}else if(res.RoleId == 2){
	       				this.$router.replace({path: '/shoplist'});
	       			}else if(res.RoleId == 3){
	       				this.$router.replace({path: '/distanceList'});
	       			}else{
	       				this.$router.replace({path: '/'});
	       			}
	       		}.bind(this));
			},
			logout: function(){
	      		this.setLoading(true);
	      		Request.LoginOut();
        		WebStorageCache.remove("token");
        		this.setLoading(false);
        		this.UserName = '';
        		this.state = false;
			}
		},
		mounted(){
			let user = WebStorageCache.get("token");
			if(user["UserName"]){
				this.state = true;
				this.UserName = user.UserName || '';
			}
		}
	}
</script>
<style  lang="less" scoped>
	@import '../styles/common';
	.login_head{
		width: 100%;
		height:90px;
		line-height: 90px;
		text-align: center;
		font-size: 20px;
	}
	.line_1{
		width: 100%;
		height: 1px;
		background: #DBDBDB;
		
	}
	.login_input{
		width: 100%;
		height: 118px;
		background: white;
		font-size: 16px;
	}
	.login_input input{
		border:none;
		outline: none;
		margin-left: 12%;
	}
	.div{
		width:90%;
		margin-left: 5%;
		height: 39px;
		padding-top: 20px;
	}
	.login_select{
		width: 100%;
		height: 20px;
		font-size: 16px;
		color:  #9C9C9C;
		padding: 40px 0 0 5%;
	}
	.line_2{
		width: 90%;
		height: 1px;
		background: #DBDBDB;
		margin-left: 5%;
	}
	.login_item{
		width: 100%;
		height: 150px;
		background: white;
		font-size: 16px;
	}
	.login_item input{
		margin-right:20px;
	}
	.divdiv{
		width: 90%;
		height: 28px;
		margin-left: 5%;
		padding-top: 21px;
	}
	.part{
		padding: .8rem .4rem;
		.unbind{
			width: 90%;
			margin: 0 auto;
			padding: .4rem;
			border: 1px solid #e9e9e9;
			background-color: #f0f3f2;
			border-radius: 6px;
	    	box-sizing: border-box;
		}
	}
	
</style>