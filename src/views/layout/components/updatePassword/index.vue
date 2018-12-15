<template>
	<dialog-detail ref="dialogDetail" dialog-title="用户密码修改" @save-data="saveData" :show-cancel="true" :show-confirm="true">
		<el-form :rules="rules" ref="dataForm" :model="user" label-position="right" label-width="200px" size="mini">
			<el-row>
				<el-col :span="10">
					<el-form-item label="登录名" prop="userCode">
						<input type="hidden" v-model="user.userId"/>
						<el-input style="width:230px;" :disabled="true" v-model="user.userCode" size="mini"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="姓名" prop="userName">
						<el-input style="width:230px;" :disabled="true" v-model="user.userName" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="原始密码" prop="oldPassword">
						<el-input type="password" style="width:660px;" clearable v-model="oldPassword" placeholder="原始密码" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="密码" prop="password">
						<el-input type="password" style="width:660px;" clearable v-model="password" placeholder="密码" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="确认密码" prop="password2">
						<el-input type="password" style="width:660px;" clearable v-model="password2" placeholder="确认密码" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="10">
					<el-form-item label="创建时间" prop="insertTime">
						<el-date-picker style="width:230px;" :disabled="true" v-model="user.insertTime" size="mini" type="date" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="修改时间" prop="updateTime">
						<el-date-picker style="width:230px;" :disabled="true" v-model="user.updateTime" size="mini" type="date" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20">
					<el-form-item label="备注" prop="remark">
						<el-input style="width:660px;" :disabled="true" v-model="user.remark"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		
		</el-form>
	</dialog-detail>
</template>

<script>
	import waves from '@/directive/waves'
	import dialogDetail from '@/components/DialogDetail'
	import {MessageBox} from 'element-ui'
	import { updateUserInfoPwd } from '@/api/login' 

	export default {
	    name: 'updatePassword',
	    directives: {
			waves
		},
		components: {
			dialogDetail
		},
  	    props: {
  	    	user:{
  	    		type: Object
  	    	}
	  	},
	  	data() {
		    return {
		    	oldPassword: '',
		    	password: '',
		    	password2: '',
			    rules: {
		        }
	        }
	  	},
	  	created() {
	  	},
	  	methods: {
	  		// 打开dialog
	  		show() {
	  			// 密码为空
	  			this.oldPassword = ''
	  			this.password = ''
	  			this.password2 = ''
	  			this.$refs["dialogDetail"].show()
	  		},
	  		// 保存
	  		saveData() {
	  			this.createData()
	  		},
	  		// 保存
	  		createData() {
	  			// 新增保存
	  			//密码验证
				let passOld = this.oldPassword
				if(passOld == null || passOld == ''){
					MessageBox({title:'提示信息', message:'请输入原始密码！', type:'info'})
					return
				}
				let pass = this.password
				let pass2 = this.password2
				if (pass == null || pass == '') {
					MessageBox({title:'提示信息', message:'请输入密码！', type:'info'})
					return
				}
				if (pass2 == null || pass2 == '') {
					MessageBox({title:'提示信息', message:'请输入确认密码！', type:'info'})
					return
				}
				if(pass != pass2){
					MessageBox({title:'提示信息', message:'确认密码和密码必须一致！', type:'info'})
				}else{
					// 提交
					updateUserInfoPwd(this.user.userId, pass, passOld).then(response => {
  						let code = response.code
  						let messa = response.msg
						if ('2' == code) {
							MessageBox({title:'提示信息', message: messa, type:'error'})
						} else if ('1' == code) {
	  						this.$refs['dialogDetail'].close()
	  						MessageBox({title:'提示信息', message: messa, type:'success'})
						} else {
							MessageBox({title:'提示信息', message: '修改密码失败!', type:'success'})
						}
  					}).catch((err) => {})
				}
	  		}
	  	}
  	}
</script>
