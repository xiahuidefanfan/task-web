<template>
	<div class="app-container">
		<div class="filter-container">
			<search-bar>
				<el-form :inline="true" class="demo-form-inline">
					<el-row>
						<el-col :span="23">
							<el-form-item label="字典编号">
								<el-input clearable v-model="queryParam.dictCode" placeholder="字典编号" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="字典名称">
								<el-input clearable v-model="queryParam.dictName" placeholder="字典名称" size="mini"></el-input>
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
		<el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading..." size="mini">
			<el-table-column type="expand" >
				<template slot-scope="props">
					<el-table :data="props.row.childrens" :stripe="true" header-row-class-name="header-class" v-loading="listLoading" element-loading-text="Loading..." size="mini">
						<el-table-column type="index" label="序号" align="center"></el-table-column>
						<el-table-column prop="dictName" label="字典名称" align="center"></el-table-column>
						<el-table-column prop="dictCode" label="字典编号" align="center"></el-table-column>
						<el-table-column prop="dictOrder" label="排序" align="center"></el-table-column>
						<el-table-column prop="creatorName" label="创建者" align="center"></el-table-column>
						<el-table-column label="操作" align="center" fixed="right">
							<template slot-scope="scope">
								<el-button type="text" @click="update(scope.row)" size="mini">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column type="index" label="序号" align="center"></el-table-column>
			<el-table-column prop="dictName"  label="字典名称" align="center"></el-table-column>
			<el-table-column prop="dictCode"  label="字典编号" align="center"></el-table-column>
			<el-table-column prop="dictOrder" label="排序" align="center"></el-table-column>
			<el-table-column prop="creatorName" label="创建者" align="center"></el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
    				<el-button type="text" @click="show(scope.row)" size="mini">查看</el-button>
    				<el-button type="text" @click="update(scope.row)" size="mini">编辑</el-button>
					<el-button type="text" @click="addSubDict(scope.row)" size="mini">新增子字典</el-button>
      			</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container">
	      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParam.pageNumber" :page-sizes="pageSizes" 
	        :page-size="queryParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
	      </el-pagination>
	    </div>
		
		<!--弹出窗口-->
		<dict-add ref="dictAdd" :dict="dict" :dictPid="dictPid" :textMap="textMap" :dialogStatus="dialogStatus" :disable="disable"></dict-add>
		
		
	</div>
</template>

<script>
	import {list} from '@/api/system/dict'
	import waves from '@/directive/waves'
	import searchBar from '@/components/SearchBar'
	import dictAdd from './dictAdd'

	export default {
		
		// 初始化
		created() {
			this.qryData();
		},

		methods: {

			// 查询字典
			qryData() {
				this.listLoading = true
				list(this.queryParam).then(response => {
					this.datas = response.datas
					this.totalCount = parseInt(response.totalCount)
					this.listLoading = false
				})
			},

			// 重置
			reset() {
				this.queryParam.dictCode = ''
				this.queryParam.dictName = ''
				this.queryParam.pageNumber = 1
				this.queryParam.pageSize = 10
				this.qryData()
			},
			
			// 新增字典
			add () {
				this.dialogStatus = 'create'
				this.disable = false
				this.dict = Object.assign({})
				this.dictPid = ''
				this.$refs["dictAdd"].show()
			},

			// 查看字典
			show (row) {
				this.dialogStatus = 'show'
				this.disable = true
				this.dict = Object.assign({}, row)
				this.$refs["dictAdd"].show()
			},

			// 编辑字典
			update (row) {
				this.dialogStatus = 'update'
				this.disable = false
				this.dict = Object.assign({}, row)
				this.$refs["dictAdd"].show()
			},

			// 添加子菜单
			addSubDict(row){
				this.dialogStatus = 'create'
				this.disable = false
				this.dict = Object.assign({})
				this.dictPid = row.dictId
				this.$refs["dictAdd"].show()
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

		name: 'dict',
		directives: {
			waves
		},
		components: {
			searchBar,
			dictAdd
		},
		data() {
			return {
				queryParam: {
					dictCode: '',
					dictName: '',
					pageNumber: 1,
					pageSize: 10
				},
				datas: [],
				dict:{},
				dictPid:'',
				totalCount: 0,
				pageSizes: [10, 15, 20, 30, 40],
				listLoading: true,
				textMap: {
					show: '字典详情',
					create: '新增字典',
					update: '字典修改'
				},
				dialogStatus: '',
				disable: false
			}
		},
	}
</script>