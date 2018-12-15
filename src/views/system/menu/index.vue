<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="24" class="query-col-class">
          <el-button-group>
            <el-button type="primary" @click="qryData" v-waves icon="el-icon-refresh" size="mini">查询</el-button>
            <el-button type="primary" @click="add" v-waves icon="el-icon-third-add3" size="mini">新增</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <el-table :data="datas" :stripe="true" header-row-class-name="header-class" border style="width: 100%" v-loading="listLoading" element-loading-text="Loading..." size="mini">
      <el-table-column type="expand" >
        <template slot-scope="props">
          <el-table :data="props.row.childrens" :stripe="true" header-row-class-name="header-class" v-loading="listLoading" element-loading-text="Loading..." size="mini">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="menuName" label="菜单名称" align="center"></el-table-column>
            <el-table-column prop="menuCode" label="菜单编号" align="center"></el-table-column>
            <el-table-column prop="menuPath" label="菜单路由" align="center"></el-table-column>
            <el-table-column prop="menuIcon" label="菜单图标" align="center"></el-table-column>
            <el-table-column prop="menuStatusName" label="菜单状态" align="center"></el-table-column>
            <el-table-column prop="isMenuName" label="是否菜单" align="center"></el-table-column>
            <el-table-column prop="creatorName" label="创建者" align="center"></el-table-column>
            <el-table-column prop="menuOrder" label="菜单排序" align="center"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button @click="show(scope.row)"  type="text" size="mini">查看</el-button>
                <el-button @click="update(scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="changeStatus(scope.row, scope.row.changeStatusName)" type="text" size="mini">{{scope.row.changeStatusName}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="menuName" label="菜单名称" align="center"></el-table-column>
      <el-table-column prop="menuCode" label="菜单编号" align="center"></el-table-column>
      <el-table-column prop="menuPath" label="菜单路由" align="center"></el-table-column>
      <el-table-column prop="menuIcon" label="菜单图标" align="center"></el-table-column>
      <el-table-column prop="menuStatusName" label="菜单状态" align="center"></el-table-column>
      <el-table-column prop="isMenuName" label="是否菜单" align="center"></el-table-column>
      <el-table-column prop="creatorName" label="创建者" align="center"></el-table-column>
      <el-table-column prop="menuOrder" label="菜单排序" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button @click="show(scope.row)"  type="text" size="mini">查看</el-button>
          <el-button @click="update(scope.row)" type="text" size="mini">编辑</el-button>
          <el-button @click="add(scope.row)" type="text" size="mini">添加</el-button>
          <el-button @click="changeStatus(scope.row, scope.row.changeStatusName)" type="text" size="mini">{{scope.row.changeStatusName}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  查看、新增、编辑 -->
    <menu-add ref="menuAdd" :textMap="textMap" :menu="menu" :menuPcode="menuCode" :dialogStatus="dialogStatus" :disable="disable"></menu-add>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import moment from 'moment'
  import searchBar from '@/components/SearchBar'
  import { Message, MessageBox } from 'element-ui'
  import {list, changeStatus} from '@/api/system/menu'
  import menuAdd from './menuAdd'

  export default {
    methods: {
      // 查询菜单
      qryData() {
        this.listLoading = true
        list(this.queryParam).then(response => {
          this.datas = response.datas
          this.listLoading = false
        })
      },

      // 添加菜单
      add(row){
        this.dialogStatus = 'add'
        this.disable = false
        this.menu = {}
        this.menuCode = row && row.menuCode
        this.menuPath = row && row.menuPath
        this.$refs["menuAdd"].show()
      },

      // 查看菜单
      show(row){
        this.dialogStatus = 'show'
        this.disable = true
        this.menu = Object.assign({}, row)
        this.$refs["menuAdd"].show()
      },

      // 修改菜单
      update(row){
        this.dialogStatus = 'update'
        this.disable = false
        this.menu = Object.assign({}, row)
        this.$refs["menuAdd"].show()
      },

      // 禁用菜单
      changeStatus(row, changeStatusName){
        this.$confirm('确定' + changeStatusName + '该菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatus({menuId:row.menuId}).then(response => {
            this.$message({
              message: response.message,
              type: 'success'
            })
            this.qryData()
           });
        }).catch((err) => {
          if(err != "cancel"){
            this.$message({
              message: err.response.data.message,
              type: 'error'
            })
          }
        })
      },
    },

    // 配置相关
    name: 'menus',
    directives: {
      waves
    },

    components: {
      searchBar,
      menuAdd
    },

    data() {
      return {
        datas: [],
        menuCode:'',
        menuPath:'',
        menu: {},        
        textMap: {
          add: '新增菜单',
          show: '菜单详情',
          update: '菜单修改'
        },
        totalCount: 0,
        pageSizes: [10, 15, 20, 30, 40],
        dialogStatus:'',
        listLoading: false,
        disable:true,
      }
    },

    // 初始化
    created() {
      this.qryData()
    },
  }
</script>
