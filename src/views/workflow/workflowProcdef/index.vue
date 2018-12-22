<template>
	<div class="app-container">
		<div class="filter-container">
			<search-bar>
				<el-form :inline="true" class="demo-form-inline">
					<el-row>
						<el-col :span="23">
							<el-form-item label="流程ID">
								<el-input clearable v-model="queryParam.procdefId" placeholder="流程ID" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="流程名称">
								<el-input clearable v-model="queryParam.procdefName" placeholder="流程名称" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="流程主键">
								<el-input clearable v-model="queryParam.procdefKey" placeholder="流程主键" size="mini"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</search-bar>
		</div>

		<div>
			<el-row>
				<el-col :span="24" class="query-col-class">
					<el-button-group>
						<el-button type="primary" @click="qryData" v-waves icon="el-icon-search" size="mini">查询</el-button>
						<el-button type="primary" @click="reset" icon="el-icon-third-zhongzhi" v-waves size="mini">重置</el-button>
					</el-button-group>
				</el-col>
			</el-row>
		</div>
		<el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" 	v-loading.body="listLoading" element-loading-text="Loading..." size="mini">
		  	<el-table-column type="expand" >
		        <template slot-scope="props">
		          	<el-table :data="props.row.childrens" :stripe="true" header-row-class-name="header-class" v-loading="listLoading" element-loading-text="Loading..." size="mini">
		          		<el-table-column type="index" label="序号" align="center"></el-table-column>
						<el-table-column prop="nodeName" label="节点名称" align="center"></el-table-column>
						<el-table-column prop="nodeCode" label="节点编码" align="center"></el-table-column>
						<el-table-column prop="nodeProcDefId" label="流程定义id" align="center"></el-table-column>
						<el-table-column prop="nodeOrder" label="节点顺序" align="center"></el-table-column>
						<el-table-column prop="nodeCanBackToName" label="可回退到" align="center"></el-table-column>
						<el-table-column prop="nodeCanRollBackName" label="可做回退" align="center"></el-table-column>
						<el-table-column prop="nodeTypeName" label="节点类型" align="center"></el-table-column>
						<el-table-column prop="nodeDesc" label="节点描述" align="center"></el-table-column>
						<el-table-column label="操作" align="center" fixed="right">
							<template slot-scope="scope">
			    				<el-button type="text" @click="show(scope.row)" size="mini">查看</el-button>
			    				<el-button type="text" @click="update(scope.row)" size="mini">编辑</el-button>
			    				<el-button type="text" @click="del(scope.row)" size="mini">删除</el-button>
			      			</template>
						</el-table-column>
		          	</el-table>
	          	</template>
      		</el-table-column>
      		<el-table-column type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="procdefId" label="流程ID" align="center"></el-table-column>	
			<el-table-column prop="procdefName" label="流程名称" align="center"></el-table-column>
			<el-table-column prop="procdefKey" label="流程主键" align="center"></el-table-column>	
			<el-table-column prop="procdefResourceName" label="资源名称" align="center"></el-table-column>
			<el-table-column prop="procdefVersion" label="版本号" align="center"></el-table-column>
			<el-table-column prop="procdefDeploymentId" label="部署主键" align="center"></el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
    				<el-button type="text" @click="addNode(scope.row)" size="mini">添加节点</el-button>
      			</template>
			</el-table-column>	
		</el-table>

		<!--分页-->
		<div class="pagination-container">
      		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParam.pageNumber" :page-sizes="pageSizes" 
        		:page-size="queryParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      		</el-pagination>
	    </div>

	    <!--弹出窗口-->
		<workflow-node-add ref="workflowNodeAdd" :workflowNode="workflowNode" :textMap="textMap" :dialogStatus="dialogStatus" :disable="disable"></workflow-node-add>
	
	</div>
</template>

<script>
	import {dateFormate} from '@/utils/dateUtils'
	import waves from '@/directive/waves'
	import searchBar from '@/components/SearchBar'
	import {list} from '@/api/workflow/workflowProcdef'
	import {del} from '@/api/workflow/workflowNode'
	import workflowNodeAdd from './workflowNodeAdd'

	export default {
		
		// 初始化
		created() {
			this.qryData()
		},

		methods: {

			// 查询任务
			qryData() {
				this.listLoading = true
				list(this.queryParam).then(response => {
					this.datas = response.datas
					this.totalCount = parseInt(response.totalCount)
					this.listLoading = false
				}).catch(() => {
					this.listLoading = false
				})
			},

			// 重置
			reset() {
				this.queryParam.procdefId = ''
				this.queryParam.procdefName = ''
				this.queryParam.procdefKey = ''
				this.queryParam.pageNumber = 1
				this.queryParam.pageSize = 10
				this.qryData()
			},

			// 新增节点
			addNode(row){
				this.dialogStatus = 'create'
				this.disable = false
				this.workflowNode = Object.assign({})
				this.workflowNode.nodeProcDefId = row.procdefId
				this.$refs["workflowNodeAdd"].show()
			},

			// 查看节点
			show(row) {
				this.dialogStatus = 'show'
				this.disable = true
				this.workflowNode = Object.assign({}, row)
				this.$refs["workflowNodeAdd"].show()
			},

			// 编辑节点
			update(row) {
				this.dialogStatus = 'update'
				this.disable = false
				this.workflowNode = Object.assign({}, row)
				this.$refs["workflowNodeAdd"].show()
			},


      		// 删除角色
	      	del(row){
		        this.$confirm('确定删除该节点吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          del({nodeId: row.nodeId}).then(response => {
		            this.$message({
		              message: response.message,
		              type: 'success'
		            })
		            this.qryData()
		          })
		        }).catch(() => {
		          this.$message({
		            message: err.response.data.message,
		            type: 'error'
		          })
		        })
	      	},

			// 选择页大小变化
			handleSizeChange(val) {
				this.queryParam.pageSize = val
				this.qryData()
			},

			// 当前页
			handleCurrentChange(val) {
				this.queryParam.pageNumber = val
				this.qryData()
			},
		},

		name: 'workflowProcdef',
		directives: {
			waves
		},
		components: {
			searchBar,
			workflowNodeAdd
		},
		data() {
			return {
				queryParam: {
					procdefId: '',
					procdefName: '',
					procdefKey: '',
					pageNumber: 1,
					pageSize: 10
				},
				datas: [],
				workflowNode:{},
				totalCount: 0,
				pageSizes: [10, 15, 20, 30, 40],
				listLoading: true,
				textMap: {
					show: '节点详情',
					create: '新增节点',
					update: '节点修改'
				},
				dialogStatus: '',
				disable: false
			}
		},
	}
</script>