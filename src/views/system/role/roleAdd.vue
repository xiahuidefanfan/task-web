<template>
   <dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" @save-data="saveData" :show-cancel="true" :show-confirm="!disable" size="medium"
    @click.native="treeShowControl($event)">
    <el-form :inline="true" ref="dataForm" id="dataForm" :rules="rules" :model="role" label-position="right" label-width="120px" size="medium">
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色名称">
            <el-input v-model="role.roleName" placeholder="角色名称" size="mini" style="width:220px;" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="角色编码">
            <el-input v-model="role.roleCode" placeholder="角色编码" size="mini" style="width:220px;" :disabled="disable"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="上级角色">
            <el-input v-model="role.pRoleName" placeholder="上级角色" size="mini" style="width:220px;" :disabled="disable" @click.native="clickRoleTree" 
              id="pRoleName" readonly></el-input>
            <el-collapse-transition> 
              <el-tree
                v-if="isTreeRender"
                :data="roleTree"
                id="roleTree"
                v-show="showRoleTree"
                node-key="id"
                show-checkbox
                :props="roleDefaultProps"
                :default-checked-keys="[this.role.rolePid||0]"
                check-strictly
                @check-change="selectRole"
                style="border: 1px solid #dcdfe6; bottom: 1px; height: 280px; overflow-y: auto; width:220px; margin-top: -4px;"
                ref="roleTree">    
              </el-tree>
            </el-collapse-transition>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="角色排序">
            <el-input-number v-model="role.roleOrder" placeholder="角色排序" size="mini" style="width:220px;" :disabled="disable"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </dialog-detail>
</template>

<script>
  import dialogDetail from '@/components/DialogDetail'
  import {queryRoleTree, add, update} from '@/api/system/role'
  import {MessageBox } from 'element-ui'

  export default {
    // 初始化
    created() {
       this.qryRoleTree()
    },

    methods: {
      // 打开dialog
      show() {
        this.$refs["dialogDetail"].show()
        this.isTreeRender=false;
        this.$nextTick(()=>{
          this.isTreeRender=true
        })
      },

      // 保存数据
      saveData(){
        if('add' == this.dialogStatus){
          this.add();
        }else if('update' == this.dialogStatus){
          this.update();
        }
      },

      // 添加角色
      add(){
        add(this.role).then(response => {
          this.$refs['dialogDetail'].close()
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.$parent.qryData()
        })
      },

      // 更新角色
      update(){
        update(this.role).then(response => {
          this.$refs['dialogDetail'].close()
            this.$message({
              message: response.message,
              type: 'success'
            })
          this.$parent.qryData()
        })
      },

      // 查询角色树
      qryRoleTree() {
        queryRoleTree().then(response => {
          this.roleTree = response.datas
        })
      },

      // 点击选择角色
      selectRole(data, checked, node){
        if(checked){
          if(this.role.rolePid != data.id){
            this.$refs.roleTree.setCheckedNodes([])
            this.role.rolePid = data.id
            this.role.pRoleName = data.name
            this.$refs.roleTree.setCheckedNodes([data])  
          }else{
            this.role.rolePid = ''
            this.role.pRoleName = ''
            this.$refs.roleTree.setCheckedNodes([]) 
          }
          this.$forceUpdate()
        }
      },

      // 显隐角色树
      clickRoleTree(){
        this.showRoleTree = !this.disable && !this.showRoleTree
      },

      // 点击控制树形控件显隐
      treeShowControl(event){
        if (!(event.target.id == "pRoleName" || event.target.id == "roleTree")) {
          this.showRoleTree = false
        }
      },

      // 页码切换
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

    name: 'roleAdd',
    components: {
      dialogDetail
    },
    props: {
      role: {
        type: Object
      },
      textMap: {
        type: Object
      },
      dialogStatus: {
        type: String
      },
      disable: {
          type:Boolean
      },
      dialogWidth:{
          type:String
      }
    },

    data() {
      return {
        isTreeRender:true,
        roleDefaultProps: {
          children: 'children',
          label: 'name'
        },
        roleTree: [],
        showRoleTree: false,
        rules: {
          roleName: [{
            required: true,
            message: '必填！',
            trigger: 'change'
          }],
        }
      }
    },
  }
</script>
