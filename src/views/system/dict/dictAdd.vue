<template>
	<dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="small">
		<el-form :rules="rules" ref="dataForm" :model="dict" label-position="right" label-width="120px" size="mini">
			<el-row>
				<el-col :span="12">
					<el-form-item label="字典名称" prop="dictName">
						<el-input style="width:250px;" clearable :disabled="disable" v-model="dict.dictName" placeholder="字典名称" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="字典编号" prop="dictCode">
						<el-input style="width:250px;" clearable :disabled="disable" v-model="dict.dictCode" placeholder="字典编号" size="mini"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="排序">
						<el-input-number style="width:250px;" clearable :disabled="disable" v-model="dict.dictOrder" placeholder="排序" size="mini"></el-input-number>
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
	import {add, update} from '@/api/system/dict'
	
	export default {
	   
	  	methods: {

	  		// 查看字典
	  		show() {
	  			this.$refs["dialogDetail"].show()
	  		},

	  		// 保存字典
	  		saveData() {
	  			if ('create' == this.dialogStatus) {
	  				this.add()
	  			} else if ('update' == this.dialogStatus) {
	  				this.update()
	  			}
	  		},

	  		// 添加字典
	  		add() {
	  			this.dict.dictPid = this.dictPid
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					add(this.dict).then(response => {
							this.$refs['dialogDetail'].close()
							this.$message({
								message:  response.message,
								type: 'success'
							})
							this.$parent.qryData()
						})
	  				}
	  			})
	  		},
	  		
	  		// 修改字典
	  		update() {
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					update(this.dict).then(response => {
							this.$refs['dialogDetail'].close()
							this.$message({
								message:  response.message,
								type: 'success'
							})
							this.$parent.qryData()
	  					})
	  				}
	  			})
	  		}
	  		
	  	},

	  	name: 'dictAdd',
	    directives: {
			waves
		},
		components: {
			dialogDetail
		},
  	    props: {
  	    	dict: {
  	    		type: Object
  	    	},
  	    	dictPid: {
		        type: String
		      },
  	    	textMap: {
    			type: Object
  	    	},
  	    	dialogStatus:{
  	    		type: String
  	    	},
       		disable: {
       			type: Boolean
       		}
	  	},
	  	data() {
		    return {
			    rules: {
		        	dictCode: [
			            { required: true, message: '必填项', trigger: 'blur' },
			            { max: 50, message: '长度 不能超过50 个字符', trigger: 'blur' }
		          	],
		          	dictName: [
			            { required: true, message: '必填项', trigger: 'blur' },
			            { max: 80, message: '长度 不能超过80 个字符', trigger: 'blur' }
		          	]
		       	},
				pid:''
	        }
	  	},

  	}
</script>
