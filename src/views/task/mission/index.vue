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
							<el-form-item label="所属模块">
							 	<el-select v-model="queryParam.missionGroup" filterable placeholder="所属模块" size="mini" :disabled="disable">
					              	<el-option v-for="item in serviceGroups" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
					            </el-select>
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
					</el-button-group>
				</el-col>
			</el-row>
		</div>
		<el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" 	v-loading.body="listLoading" element-loading-text="Loading..." size="mini">
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
		<mission-add ref="missionAdd" :mission="mission" :textMap="textMap" :dialogStatus="dialogStatus" :disable="disable"></mission-add>
	
	</div>
</template>

<script>
	import {dateFormate} from '@/utils/dateUtils'
	import waves from '@/directive/waves'
	import searchBar from '@/components/SearchBar'
	import dictTypeConstant from '@/utils/dictTypeConstant'
  	import {queryDictByParentCode} from '@/api/system/dict'
	import {list} from '@/api/task/mission'
	import missionAdd from './missionAdd'

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
			add () {
				this.dialogStatus = 'create'
				this.disable = false
				this.mission = Object.assign({})
				this.$refs["missionAdd"].show()
			},

			// 查看任务
			show (row) {
				this.dialogStatus = 'show'
				this.disable = true
				this.mission = Object.assign({}, row)
				this.$refs["missionAdd"].show()
			},

			// 编辑需求
			update (row) {
				this.dialogStatus = 'update'
				this.disable = false
				this.mission = Object.assign({}, row)
				this.$refs["missionAdd"].show()
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

		name: 'mission',
		directives: {
			waves
		},
		components: {
			searchBar,
			missionAdd
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
				mission:{},
				totalCount: 0,
				pageSizes: [10, 15, 20, 30, 40],
				listLoading: true,
				textMap: {
					show: '任务查看',
					create: '任务新建',
					update: '任务编辑'
				},
				dialogStatus: '',
				disable: false,
				// 服务组件下拉
		       	serviceGroups:[]
			}
		},
	}
</script>