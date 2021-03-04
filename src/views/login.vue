<template>
	<div>
		<div class="hearder">{{msg}}</div>
		<div class="body">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="用户名:" prop="username" class="one">
					<el-input type="text" v-model="ruleForm.username" class="shezhi"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password" class="one">
					<el-input type="password" v-model="ruleForm.password" class="shezhi"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="two" @click="submitForm('ruleForm')">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import dialog from "../components/js/dialog.js"
import qs from 'qs'
import axios from 'axios'
export default {
  name: 'login',
  data(){
      return {
          msg:'登录页面',
			ruleForm:{
			username:'cloud',
			password:'123456'
				},
				dialogVisible: false
			}
		},
		methods: {
			submitForm: function() {
				var url = "http://139.9.83.195/api/dpass/openApi/auth"; //接口
				var md5Pwd = this.$md5(this.ruleForm.password); //加密
				//console.log(md5pwd);
				var rFoem = { //表单
					username: this.ruleForm.username,
					password: md5Pwd
				}
			var data=qs.stringify(rFoem);
			axios.post(url,data).then(resp=>{
			if(resp.data.msg==null){
			alert("登录成功");
			localStorage.setItem("token", resp.data.result.token);//保存令牌
			this.tiaozhuan("menued");//执行点击事件
			wps.PluginStorage.setItem("EnableFlag", 1)
			wps.ribbonUI.InvalidateControl("menued")
			window.opener=null;window.open('','_self');window.close();//关闭
			
			}else{
				this.$message.error(resp.data.msg);
			}
			console.log(resp);//后台返回的相应Json数据 啥
			}).catch(resp=>{
				console.log(resp);
			});
			},
			tiaozhuan: function(id) {
				return dialog.onbuttonclick(id); //跳转事件
			}
			

		},
		mounted() {
			axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
				this.DemoSpan = res.data;
			});
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.global {
		font-size: 15px;
		min-height: 95%;
	}

	.divItem {
		margin-left: 5px;
		margin-bottom: 18px;
		font-size: 15px;
		word-wrap: break-word;
	}

	.hearder {
		width: 180px;
		font-size: 40px;
		border: 0px solid red;
		margin: 60px auto;
		top: 80px;
	}

	.shezhi {
		width: 300px;
		margin-left: 30px;
	}

	.body {
		width: 700px;
		height: 400px;
		border: 0px solid red;
		margin: auto;
	}

	.one {
		border: 0px solid red;
		margin-top: 50px;
		margin-left: 30px;
	}

	.two {
		margin-top: 30px;
		width: 250px;
		margin-left: 75px;
	}
</style>
