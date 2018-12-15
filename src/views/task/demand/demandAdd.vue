<template>
	<dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="medium">
		<el-form :rules="rules" ref="dataForm" :model="demand" label-position="right" label-width="120px" size="mini">
			<el-row>
		        <el-col :span="10">
	          		<el-form-item label="需求名称" prop="demandName">
	           	 		<el-input v-model="demand.demandName" placeholder="需求名称" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
		        <el-col :span="10">
		          	<el-form-item label="需求jira单号" prop="demandJira">
		           		<el-input v-model="demand.demandJira" placeholder="需求jira单号" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
	      	</el-row>
	      	
      	  	<el-row>
		        <el-col :span="10">
	          		<el-form-item label="开始日期" prop="demandStartDate">
	           	 		 <el-date-picker v-model="demand.demandStartDate" placeholder="开始日期" size="mini" :disabled="disable" style="width:220px;"></el-date-picker>
		          	</el-form-item>
		        </el-col>
		        <el-col :span="10">
		          	<el-form-item label="结束日期" prop="demandStage">
		           		<el-date-picker v-model="demand.demandEndDate" placeholder="结束日期" size="mini" :disabled="disable" style="width:220px;"></el-date-picker>
		          	</el-form-item>
		        </el-col>
	      	</el-row>

	      	<el-row>
		        <el-col :span="10">
	          		<el-form-item label="需求描述" prop="demandDesc">
	           	 		<el-input v-model="demand.demandDesc" placeholder="需求描述" size="medium" :rows="3" :disabled="disable" type="textarea" style="width:578px;"></el-input>
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
	import {processDate} from '@/utils/index'
	import {add, update} from '@/api/task/demand'
	
	export default {
	   
	  	methods: {

	  		// 查看需求
	  		show() {
	  			this.$refs["dialogDetail"].show()
	  		},

	  		// 保存需求
	  		saveData() {
	  			this.demand.demandStartDate = processDate(this.demand.demandStartDate || '')
	  			this.demand.demandEndDate = processDate(this.demand.demandEndDate || '')
	  			if ('create' == this.dialogStatus) {
	  				this.add()
	  			} else if ('update' == this.dialogStatus) {
	  				this.update()
	  			}
	  		},

	  		// 添加需求
	  		add() {
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					add(this.demand).then(response => {
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
	  		
	  		// 修改需求
	  		update() {
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					update(this.demand).then(response => {
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

	  	name: 'demandAdd',
	    directives: {
			waves
		},
		components: {
			dialogDetail
		},
  	    props: {
  	    	demand: {
  	    		type: Object
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
		          	demandName: [
			            { required: true, message: '需求名称必填', trigger: 'blur' },
			            { max: 128, message: '长度 不能超过128 个字符', trigger: 'blur' }
		          	]
		       	},
	        }
	  	},

  	}
</script>
