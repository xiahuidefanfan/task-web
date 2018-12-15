<template>
	<dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="medium">
		<el-form :rules="rules" ref="dataForm" :model="workflowNode" label-position="right" label-width="120px" size="mini">
			<el-row>
		        <el-col :span="10">
	          		<el-form-item label="节点名称">
	           	 		<el-input v-model="workflowNode.nodeName" placeholder="节点名称" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
		       <el-col :span="10">
	          		<el-form-item label="节点编码" prop="nodeCode">
	           	 		<el-input v-model="workflowNode.nodeCode" placeholder="节点编码" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
	      	</el-row>

      		<el-row>
		        <el-col :span="10">
	          		<el-form-item label="流程定义id" prop="nodeProcDefId">
	           	 		<el-input v-model="workflowNode.nodeProcDefId" placeholder="流程定义id" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
	            <el-col :span="10">
	          		<el-form-item label="节点版本" prop="nodeVersion">
	           	 		<el-input v-model="workflowNode.nodeVersion" placeholder="节点版本" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
          	 	</el-col>
	      	</el-row>

  			<el-row>
		        <el-col :span="10">
	          		<el-form-item label="节点顺序" prop="nodeOrder">
	           	 		<el-input v-model="workflowNode.nodeOrder" placeholder="节点顺序" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
	            <el-col :span="10">
		          	<el-form-item label="节点类型" prop="nodeTypeName">
			            <el-select v-model="workflowNode.nodeTypeName" filterable placeholder="节点类型" size="mini" :disabled="disable" style="width:220px;">
			              	<el-option v-for="item in nodeTypes" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
			            </el-select>
		          	</el-form-item>
          	 	</el-col>
	      	</el-row>

	      	<el-row>
		        <el-col :span="10">
	          		<el-form-item label="可回退到" prop="nodeCanBackTo">
			            <el-select v-model="workflowNode.nodeCanBackTo" filterable placeholder="可回退到" size="mini" :disabled="disable" style="width:220px;">
			              	<el-option v-for="item in YesOrNo" :key="item.code" :label="item.name" :value="item.code"></el-option>
			            </el-select>
		          	</el-form-item>

		        </el-col>
	            <el-col :span="10">
		          	<el-form-item label="可做回退" prop="nodeCanRollBack">
			            <el-select v-model="workflowNode.nodeCanRollBack" filterable placeholder="可做回退" size="mini" :disabled="disable" style="width:220px;">
			              	<el-option v-for="item in YesOrNo" :key="item.code" :label="item.name" :value="item.code"></el-option>
			            </el-select>
		          	</el-form-item>
          	 	</el-col>
	      	</el-row>
	      
	      	<el-row>
		        <el-col :span="10">
	          		<el-form-item label="节点描述" prop="nodeDesc">
	           	 		<el-input v-model="workflowNode.nodeDesc" placeholder="节点描述" size="medium" :rows="3" :disabled="disable" type="textarea" style="width:578px;"></el-input>
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
	import dictTypeConstant from '@/utils/dictTypeConstant'
	import commonConstants from '@/utils/commonConstants'
  	import {queryDictByParentCode} from '@/api/system/dict'
	import {processDate} from '@/utils/index'
	import {add, update} from '@/api/workflow/workflowNode'
	
	export default {

		// 初始化
	    created() {
	    	this.queryNodeTypes()
	    },
	   
	  	methods: {

	  		// 查看任务
	  		show() {
	  			this.$refs["dialogDetail"].show()
	  		},

	  		// 保存任务
	  		saveData() {
	  			if ('create' == this.dialogStatus) {
	  				this.add()
	  			} else if ('update' == this.dialogStatus) {
	  				this.update()
	  			}
	  		},

	  		// 添加任务
	  		add() {
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					add(this.workflowNode).then(response => {
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
	  		
	  		// 修改任务
	  		update() {
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					update(this.workflowNode).then(response => {
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

  			// 节点类型
      		queryNodeTypes(){
		        queryDictByParentCode({code:dictTypeConstant.WORKFLOW_NODE_TYPE}).then(response => {
	          		this.nodeTypes = response.datas
		        })
      		}
	  	},

	  	name: 'workflowNodeAdd',
	    directives: {
			waves
		},
		components: {
			dialogDetail
		},
  	    props: {
  	    	workflowNode: {
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
		          	
		       	},
		       	YesOrNo : commonConstants.YesOrNo,
		       	nodeTypes: []
	        }
	  	},

  	}
</script>
