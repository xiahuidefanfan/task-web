<template>
	<dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="medium">
		<el-form :rules="rules" ref="dataForm" :model="mission" label-position="right" label-width="120px" size="mini">
			<el-row>
		        <el-col :span="10">
	          		<el-form-item label="任务名称">
	           	 		<el-input v-model="mission.missionName" placeholder="任务名称" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
		        <el-col :span="10">
	          	  	<el-form-item label="所属模块" prop="missionGroup">
			            <el-select v-model="mission.missionGroup" filterable placeholder="所属模块" size="mini" :disabled="disable" style="width:220px;">
			              	<el-option v-for="item in serviceGroups" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
			            </el-select>
		          	</el-form-item>
		        </el-col>
	      	</el-row>

      		<el-row>
		        <el-col :span="10">
	          		<el-form-item label="所属需求" prop="missionDemandName">
	           	 		<el-input v-model="mission.missionDemandName" placeholder="所属需求" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
		        </el-col>
	            <el-col :span="10">
	          		<el-form-item label="工作量" prop="missionWorkdays">
	           	 		<el-input v-model="mission.missionWorkdays" placeholder="工作量" size="mini" :disabled="disable" style="width:220px;"></el-input>
		          	</el-form-item>
          	 	</el-col>
	      	</el-row>

      		<el-row>
		        <el-col :span="10">
	          		<el-form-item label="开始日期" prop="missionStartDate">
	           	 		 <el-date-picker v-model="mission.missionStartDate" type="date" placeholder="开始日期" :disabled="disable" style="width:220px;"></el-date-picker>
		          	</el-form-item>
		        </el-col>
		        <el-col :span="10">
		          	<el-form-item label="结束日期" prop="missionEndDate">
		           		<el-date-picker v-model="mission.missionEndDate" type="date" placeholder="结束日期" size="mini" :disabled="disable" style="width:220px;"></el-date-picker>
		          	</el-form-item>
		        </el-col>
	      	</el-row>
	      	
      		<el-row>
		        <el-col :span="10">
	          		<el-form-item label="测试人员" prop="missionTesterName">
						<el-autocomplete class="inline-input" v-model="mission.missionTesterName"
						:fetch-suggestions="selectTesters"
						placeholder="请选择测试人员"
						@select="handleTester"
						@blur="checkTester"
						:disabled="disable"
						style="width:220px;">
						</el-autocomplete>
					</el-form-item>	
		        </el-col>
	         	<el-col :span="10">
	          		<el-form-item label="开发人员" prop="missionDeveloperName">
						<el-autocomplete class="inline-input" v-model="mission.missionDeveloperName"
						:fetch-suggestions="selectDevelopers"
						placeholder="请选择开发人员"
						@select="handleDeveloper"
						@blur="checkDeveloper"
						:disabled="disable"
						style="width:220px;">
						</el-autocomplete>
					</el-form-item>	
		        </el-col>
	      	</el-row>

	      	<el-row>
		        <el-col :span="10">
	          		<el-form-item label="需求描述" prop="missionDesc">
	           	 		<el-input v-model="mission.missionDesc" placeholder="需求描述" size="medium" :rows="3" :disabled="disable" type="textarea" style="width:578px;"></el-input>
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
  	import {queryDictByParentCode} from '@/api/system/dict'
  	import {queryTesters, queryDevelopers} from '@/api/system/user'
	import {processDate} from '@/utils/index'
	import {add, update} from '@/api/task/mission'
	
	export default {

		// 初始化
	    created() {
      		this.queryServiceGroups()
  		    this.queryTesters() 
  		    this.queryDevelopers()  
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
	  			this.mission.missionStartDate = processDate(this.mission.missionStartDate)
	  			this.mission.missionEndDate = processDate(this.mission.missionEndDate)
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					add(this.mission).then(response => {
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
	  			this.mission.missionStartDate = processDate(this.mission.missionStartDate)
	  			this.mission.missionEndDate = processDate(this.mission.missionEndDate)
	  			this.$refs['dataForm'].validate((valid) => {
	  				if (valid) {
	  					update(this.mission).then(response => {
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

	  		// 查询服务组件
      		queryServiceGroups(){
		        queryDictByParentCode({code:dictTypeConstant.SERVICE_GROUP}).then(response => {
	          		this.serviceGroups = response.datas
		        })
      		},
	  		

      		// 获取测试人员，用于选择
	      	selectTesters(queryString, cb) {
	        	let testers = this.testers;
		        let results = queryString ? testers.filter(this.createSelectFilter(queryString)) : testers;
		        cb(results);
	        },

	        // 获取开发人员，用于选择
	      	selectDevelopers(queryString, cb) {
	        	let developers = this.developers;
		        let results = queryString ? developers.filter(this.createSelectFilter(queryString)) : developers;
		        cb(results);
	        },

	        // 过滤器
      		createSelectFilter(queryString) {
        		return (user) => {
          			return (user.userRealName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
       			 };
      		},

      		// 获取所有测试者
	      	queryTesters() {
		        queryTesters().then(response =>{
		          	if(response.datas && response.datas.length > 0){
		            	for(let i = 0; i < response.datas.length; i++){
		            		response.datas[i]['id'] = response.datas[i].userId
		            		response.datas[i]['value'] = response.datas[i].userRealName
	           		 	}
	          		}
		            this.testers = response.datas;
		        })
	      	},

	      	// 选择测试
	      	handleTester(item) {
		        this.mission.missionTester = item.id
		        this.$forceUpdate()
	     	},
			
			// 校验测试
			checkTester(){
				if(!this.mission.missionTester){
					this.mission.missionTesterName = ""
				}
			},

			// 获取所有开发者
	      	queryDevelopers() {
		        queryDevelopers().then(response =>{
		          	if(response.datas && response.datas.length > 0){
		            	for(let i = 0; i < response.datas.length; i++){
		            		response.datas[i]['id'] = response.datas[i].userId
		            		response.datas[i]['value'] = response.datas[i].userRealName
	           		 	}
	          		}
		            this.developers = response.datas;
		        })
	      	},

			// 选择开发
	      	handleDeveloper(item) {
		        this.mission.missionDeveloper = item.id
				this.$forceUpdate()
	     	},
			
			// 校验开发
			checkDeveloper(){
				if(!this.mission.missionDeveloper){
					this.mission.missionDeveloperName = ""
				}
			}
	  	},

	  	name: 'missionAdd',
	    directives: {
			waves
		},
		components: {
			dialogDetail
		},
  	    props: {
  	    	mission: {
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

		       	// 服务组件下拉
		       	serviceGroups:[],
		       	// 测试人员集合，用于下拉
		       	testers:[],
		       	// 开发人员集合，用于下拉
		       	developers:[]
	        }
	  	},

  	}
</script>
