<template>
	<div class="app-container">
		<div class="filter-container">
			<search-bar>
				<el-form :inline="true" class="demo-form-inline">
					<el-row>
						<el-col :span="23">
							<el-form-item label="需求编号">
								<el-input clearable v-model="queryParam.dictCode" placeholder="需求编号" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="需求名称">
								<el-input clearable v-model="queryParam.dictName" placeholder="需求名称" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="jira单号">
								<el-input clearable v-model="queryParam.dictName" placeholder="需求名称" size="mini"></el-input>
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
		 	<el-table-column type="expand" >
		        <template slot-scope="props">
		          	<el-table :data="props.row.childrens" :stripe="true" header-row-class-name="header-class" v-loading="listLoading" element-loading-text="Loading..." size="mini">
			           	<-- 任务数据 -->
			            <el-table-column type="index" label="序号" align="center"></el-table-column>
						<el-table-column prop="missionName" label="任务名称" align="center"></el-table-column>
						<el-table-column prop="missionDemandName" label="所属需求" align="center"></el-table-column>
						<el-table-column prop="missionGroupName" label="所属模块" align="center"></el-table-column>
						<el-table-column prop="missionStageName" label="任务阶段" align="center"></el-table-column>
						<el-table-column prop="missionDeveloperName" label="开发" align="center"></el-table-column>
						<el-table-column prop="missionTesterName" label="测试" align="center"></el-table-column>
						<el-table-column prop="missionWorkdays" label="工作量（天）" align="center"></el-table-column>
						<el-table-column prop="missionStartDate" label="任务开始时间" align="center"></el-table-column>
						<el-table-column prop="missionEndDate" label="任务结束时间" align="center"></el-table-column>
						<el-table-column prop="missionDesc" label="任务描述" align="center"></el-table-column>
	         	 	</el-table>
		        </template>
      		</el-table-column>
      		<-- 需求数据 -->
			<el-table-column type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="demandName" label="需求名称" align="center"></el-table-column>
			<el-table-column prop="demandJira" label="需求jira单号" align="center"></el-table-column>
			<el-table-column prop="demandOriginatorName" label="需求发起人" align="center"></el-table-column>
			<el-table-column prop="demandStartDate" label="开始日期" align="center"></el-table-column>
			<el-table-column prop="demandEndDate" label="结束日期" align="center"></el-table-column>
			<el-table-column prop="demandStageName" label="需求阶段" align="center"></el-table-column>
			<el-table-column prop="demandDesc" label="需求描述" align="center"></el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
    				<el-button type="text" @click="show(scope.row)" size="mini">查看</el-button>
    				<el-button type="text" @click="update(scope.row)" size="mini">编辑</el-button>
    				<el-button type="text" @click="update(scope.row)" size="mini" v-if="scope.row.showStart == true">启动</el-button>
    				<el-button type="text" @click="addMission(scope.row)" size="mini" v-if="scope.row.showAddMission == true">拆分</el-button>
      			</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container">
	      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParam.pageNumber" :page-sizes="pageSizes" 
	        :page-size="queryParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
	      </el-pagination>
	    </div>
		
		<!--弹出窗口-->
		<demand-add ref="demandAdd" :demand="demand" :textMap="textMap" :dialogStatus="dialogStatus" :disable="disable"></demand-add>
		<mission-add ref="missionAdd" :mission="mission" :textMap="textMap" :dialogStatus="dialogStatus" :disable="disable"></mission-add>
		
		
	</div>
</template>

<script>
	import {dateFormate} from '@/utils/dateUtils'
	import waves from '@/directive/waves'
	import searchBar from '@/components/SearchBar'
	import {list} from '@/api/task/demand'
	import demandAdd from './demandAdd'
	import missionAdd from '@/views/task/mission/missionAdd'

	export default {
		
		// 初始化
		created() {
			this.qryData()
		},

		methods: {

			// 查询需求
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
				this.queryParam.demandName = ''
				this.queryParam.demandJira = ''
				this.queryParam.demandOriginatorName = ''
				this.queryParam.pageNumber = 1
				this.queryParam.pageSize = 10
				this.qryData()
			},
			
			// 新增需求
			add () {
				this.dialogStatus = 'create'
				this.disable = false
				this.demand = Object.assign({})
				this.$refs["demandAdd"].show()
			},

			// 新增需求
			addMission (row) {
				this.dialogStatus = 'create'
				this.disable = false
				this.mission = Object.assign({})
				this.mission.missionDemandId = row.demandId
				this.mission.missionDemandName = row.demandName
				this.$refs["missionAdd"].show()
			},

			// 查看需求
			show (row) {
				this.dialogStatus = 'show'
				this.disable = true
				this.demand = Object.assign({}, row)
				this.$refs["demandAdd"].show()
			},

			// 编辑需求
			update (row) {
				this.dialogStatus = 'update'
				this.disable = false
				this.demand = Object.assign({}, row)
				this.$refs["demandAdd"].show()
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

		name: 'demand',
		directives: {
			waves
		},
		components: {
			searchBar,
			demandAdd,
			missionAdd
		},
		data() {
			return {
				queryParam: {
					demandName: '',
					demandJira: '',
					demandOriginatorName: '',
					pageNumber: 1,
					pageSize: 10
				},
				datas: [],
				demand: {},
				mission: {},
				totalCount: 0,
				pageSizes: [10, 15, 20, 30, 40],
				listLoading: true,
				textMap: {
					show: '需求查看',
					create: '需求新建',
					update: '需求编辑'
				},
				dialogStatus: '',
				disable: false,
				missionDemandId:''
			}
		},
	}
</script>