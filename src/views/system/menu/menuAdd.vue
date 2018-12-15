<template>
  <dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="medium">
    <el-form :inline="true" ref="dataForm" id="dataForm" :rules="rules" :model="menu" label-position="right" label-width="120px" size="medium">
      <el-row>
        <el-col :span="10">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="menu.menuName" placeholder="菜单名称" size="mini" :disabled="disable" style="width:220px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="菜单编号" prop="menuCode">
            <el-input v-model="menu.menuCode" placeholder="菜单编号" size="mini" :disabled="disable" style="width:220px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="菜单路由" prop="menuPath">
            <el-input v-model="menu.menuPath" placeholder="菜单路由" size="mini" :disabled="disable" style="width:220px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="菜单图标" prop="menuIcon">
            <el-input v-model="menu.menuIcon" placeholder="菜单图标" size="mini" :disabled="disable" style="width:220px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="菜单状态" prop="menuStatus">
            <el-select v-model="menu.menuStatus" filterable placeholder="请选择" size="mini" :disabled="disable" style="width:220px;">
              <el-option v-for="item in sysTateTypes" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否菜单" prop="menuIsMenu">
            <el-select v-model="menu.menuIsMenu" filterable placeholder="请选择" size="mini" :disabled="disable" style="width:220px;">
              <el-option v-for="item in isMenuTypes" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="10">
          <el-form-item label="菜单排序" prop="menuOrder">
            <el-input-number v-model="menu.menuOrder" placeholder="菜单排序" size="mini" :disabled="disable" style="width:220px;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </dialog-detail>
</template>

<script>
  import dialogDetail from '@/components/DialogDetail'
  import {MessageBox, Message} from 'element-ui'
  import dictTypeConstant from '@/utils/dictTypeConstant'
  import {queryDictByParentCode} from '@/api/system/dict'
  import {add, update} from '@/api/system/menu'

  export default {
    // 初始化
    created() {
      this.selectSysStateType()
      this.selectIsMenuType()
    },
    methods: {
      // 展示数据
      show() {
        this.$refs["dialogDetail"].show()
      },

      // 保存菜单
      saveData(){
        if('add' == this.dialogStatus){
          this.add()
        }else if('update' == this.dialogStatus){
          this.update()
        }
      },

      // 添加菜单
      add(){
        this.menu.menuPcode = this.menuPcode
        add(this.menu).then(response => {
          this.$refs['dialogDetail'].close()
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.$parent.qryData()
        })
      },

      // 更新菜单
      update(){
        update(this.menu).then(response => {
          this.$refs['dialogDetail'].close()
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.$parent.qryData()
        })
      },

      // 查询系统通用状态
      selectSysStateType(){
        queryDictByParentCode({code:dictTypeConstant.SYS_STATE_TYPE}).then(response => {
          this.sysTateTypes = response.datas
        })
      },

      // 查询是否是菜单字典
      selectIsMenuType(){
        queryDictByParentCode({code:dictTypeConstant.IS_MENU_TYPE}).then(response => {
          this.isMenuTypes = response.datas
        })
      },
    },

    name: 'menuAdd',
    components: {
      dialogDetail
    },

    // 父子视图传值
    props: {
      menu: {
        type: Object
      },
      textMap: {
        type: Object
      },
      dialogStatus: {
        type: String
      },
      menuPcode: {
        type: String
      },
      disable: {
          type:Boolean
      }
    },

    data() {
      return {

        // 表单校验规则
        rules: {},

        // 系统通用状态
        sysTateTypes:[],
        // 是否是菜单
        isMenuTypes:[]
      }
    },
}
</script>
