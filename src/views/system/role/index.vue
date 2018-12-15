<template>
  <div class="app-container">
    <div class="filter-container">
      <search-bar>
        <el-form :inline="true" class="demo-form-inline" label-width="80px">
          <el-row>
            <el-col :span="23">
              <el-form-item label="角色名称">
                <el-input v-model="queryParam.roleName" placeholder="角色名称" size="mini"></el-input>
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
            <el-button type="primary" @click="reset" v-waves icon="el-icon-third-zhongzhi" size="mini">重置</el-button>
            <el-button type="primary" @click="add" v-waves icon="el-icon-third-add3" size="mini">新增</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading..." size="mini">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="roleCode" label="角色编号" align="center"></el-table-column>
      <el-table-column prop="pRoleName" label="父级菜单" align="center"></el-table-column>
      <el-table-column prop="roleOrder" label="角色排序" align="center"></el-table-column>
      <el-table-column prop="creatorName" label="创建者" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button @click="show(scope.row)"  type="text" size="mini">查看</el-button>
          <el-button @click="update(scope.row)" type="text" size="mini">编辑</el-button>
          <el-button @click="authority(scope.row)" type="text" size="mini">角色授权</el-button>
          <el-button @click="del(scope.row)" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParam.pageNumber" :page-sizes="pageSizes" 
        :page-size="queryParam.pageSize" layout="total,   sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>

    <!--  查看、新增、编辑 -->
    <role-add ref="roleAdd" :textMap="textMap" :role="role" :dialogStatus="dialogStatus" :disable="disable"></role-add>

    <!-- 授权 -->
    <grant-authority ref="grantAuthority" :textMap="textMap" :role="role" :dialogStatus="dialogStatus" :disable="disable"></grant-authority>

  </div>

</template>

<script>
  import waves from '@/directive/waves'
  import moment from 'moment'
  import searchBar from '@/components/SearchBar'
  import {Message, MessageBox } from 'element-ui'
  import {list, del} from '@/api/system/role'
  import roleAdd from './roleAdd'
  import grantAuthority from './grantAuthority'

  export default {
    // 初始化
    created() {
      this.qryData();
    },

    methods: {
      // 查询
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
        this.queryParam.roleName = ''
        this.queryParam.pageNumber = 1
        this.queryParam.pageSize = 10
        this.qryData()
      },

      // 添加角色
      add(){
        this.dialogStatus = 'add'
        this.disable = false
        this.role = {}
        this.$refs["roleAdd"].show()
      },

      // 查看角色
      show(row){
        this.dialogStatus = 'detail'
        this.disable = true
        this.role = Object.assign({}, row);
        this.$refs["roleAdd"].show()
      },

      // 修改角色
      update(row){
        this.dialogStatus = 'update'
        this.disable = false
        this.role = Object.assign({}, row)
        this.$refs["roleAdd"].show()
      },

      // 删除角色
      del(row){
        this.$confirm('确定删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del({roleId: row.roleId}).then(response => {
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

      // 角色授权  
      authority(row){
        this.dialogStatus = 'grantAuthority'
        this.disable = true
        this.role = Object.assign({}, row)
        this.$refs["grantAuthority"].show()
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

    name: 'role',
    directives: {
      waves
    },
    components: {
      searchBar,
      roleAdd,
      grantAuthority
    },

    data() {
      return {
        queryParam: {
          roleName: '',
          pageNumber: 1,
          pageSize: 10
        },
        datas: [],
        role: {},
        totalCount: 0,
        pageSizes: [10, 15, 20, 30, 40],
        listLoading: false,
        textMap: {
          add: '新增角色',
          detail:'角色详情',
          update:'角色修改',
          grantAuthority:'角色授权'
        },
        dialogStatus:'',
        disable:true
      }
    },
  }
</script>
