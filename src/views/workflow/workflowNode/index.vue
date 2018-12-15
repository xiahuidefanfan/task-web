<template>
	<div class="app-container">
		<div class="filter-container">
			<search-bar>
				<el-form :inline="true" class="demo-form-inline">
					<el-row>
						<el-col :span="23">
							<el-form-item label="任务名称">
								<el-input clearable v-model="queryParam.missionName" placeholder="任务名称" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="所属需求">
								<el-input clearable v-model="queryParam.missionName" placeholder="所属需求" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="任务开发">
								<el-input clearable v-model="queryParam.missionDeveloperName" placeholder="任务开发" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="任务测试">
								<el-input clearable v-model="queryParam.missionTesterName" placeholder="任务测试" size="mini"></el-input>
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
						<el-button type="primary" @click="add()" v-waves icon="el-icon-third-add3" v-waves size="mini">新增</el-button>
					</el-button-group>
				</el-col>
			</el-row>
		</div>
		<el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" 	v-loading.body="listLoading" element-loading-text="Loading..." size="mini">
			<el-table-column type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="nodeName" label="节点名称" align="center"></el-table-column>
			<el-table-column prop="nodeCode" label="节点编码" align="center"></el-table-column>
			<el-table-column prop="nodeProcDefId" label="流程定义id" align="center"></el-table-column>
			<el-table-column prop="nodeVersion" label="节点版本" align="center"></el-table-column>
			<el-table-column prop="nodeOrder" label="节点顺序" align="center"></el-table-column>
			<el-table-column prop="nodeCanBackToName" label="可回退到" align="center"></el-table-column>
			<el-table-column prop="nodeCanRollBackName" label="可做回退" align="center"></el-table-column>
			<el-table-column prop="nodeTypeName" label="节点类型" align="center"></el-table-column>
			<el-table-column prop="nodeDesc" label="节点描述" align="center"></el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
    				<el-button type="text" @click="show(scope.row)" size="mini">查看</el-button>
    				<el-button type="text" @click="update(scope.row)" size="mini">编辑</el-button>
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
	import dictTypeConstant from '@/utils/dictTypeConstant'
  	import {queryDictByParentCode} from '@/api/system/dict'
	import {list} from '@/api/workflow/workflowNode'
	import workflowNodeAdd from './workflowNodeAdd'

	export default {
		
		// 初始化
		created() {
			this.qryData()
			this.queryServiceGroups()
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
				this.queryParam.missionName = ''
				this.queryParam.missionTesterName = ''
				this.queryParam.missionDeveloperName = ''
				this.queryParam.missionDemandName = ''
				this.missionGroup = '',
				this.queryParam.pageNumber = 1
				this.queryParam.pageSize = 10
				this.qryData()
			},

			// 查询服务组件
      		queryServiceGroups(){
		        queryDictByParentCode({code:dictTypeConstant.SERVICE_GROUP}).then(response => {
	          		this.serviceGroups = response.datas
		        })
      		},

			// 新增需求
			add() {
				this.dialogStatus = 'create'
				this.disable = false
				this.workflowNode = Object.assign({})
				this.$refs["workflowNodeAdd"].show()
			},

			// 查看任务
			show(row) {
				this.dialogStatus = 'show'
				this.disable = true
				this.workflowNode = Object.assign({}, row)
				this.$refs["workflowNodeAdd"].show()
			},

			// 编辑需求
			update(row) {
				this.dialogStatus = 'update'
				this.disable = false
				this.workflowNode = Object.assign({}, row)
				this.$refs["workflowNodeAdd"].show()
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

		name: 'workflowNode',
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
					missionName: '',
					missionGroup: '',
					missionTesterName: '',
					missionDeveloperName: '',
					missionDemandName: '',
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