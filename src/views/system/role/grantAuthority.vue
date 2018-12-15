<template>
  <dialog-detail ref="dialogDetail" :dialog-title="textMap[dialogStatus]" :append-to-body="true" @save-data="saveData" @open-reset="openReset" :show-cancel="true" :show-confirm="true" size="mini">
	<div class="app-container">
		<el-tree
			v-if="isTreeRender"
		  	:data="authorityTree"
		 	show-checkbox
		  	node-key="id"
		  	:default-checked-keys="[this.role.rolePid||0]"
		  	:props="defaultProps"
		 	ref="authorityTree">
		</el-tree>
	</div>
  </dialog-detail>
</template>

<script>
	import dialogDetail from '@/components/DialogDetail'
	import {queryMenuTree, queryCurRoleAuthority} from '@/api/system/menu'
	import {setAuthority} from '@/api/system/role'

	export default {
		
		// 初始化
		created() {
			this.queryMenuTree()
		},

		methods: {
			// 打开dialog
		    show() {
		        this.$refs["dialogDetail"].show()
	          	this.isTreeRender = false
		        this.$nextTick(()=>{
	          		this.isTreeRender=true
        		})
		    },

		    // 打开设置权限窗口，回写获取用户权限
	        openReset(){
    			// 获取用户权限集合
		        queryCurRoleAuthority({roleId:this.role.roleId}).then(response => {
		        	let authArr = []	           
		            for(let i = 0; i < response.datas.length; i++){
		            	if(response.datas[i].pid){
		            		authArr.push(response.datas[i].id)
		            	}
		            }
		            this.$refs.authorityTree.setCheckedKeys(authArr)
		        })
      		},

			// 获取角色树
			queryMenuTree(){
				queryMenuTree().then(response => {
                   this.authorityTree = response.datas
        		})
			},

			// 保存数据
		    saveData(){
		    	let authorityParams = {
		    		roleId: this.role.roleId,
		    		ids: this.$refs.authorityTree.getCheckedKeys().concat(this.$refs.authorityTree.getHalfCheckedKeys()).join(",")
		    	}
		        setAuthority(authorityParams).then(response => {
		            this.$refs['dialogDetail'].close()
		            this.$message({
		            	message: response.message,
		            	type: 'success'
		            })
	            	this.$parent.qryData()
	        	}).catch((err) => {})
		    },
			
		},

		name: 'grantAuthority',
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
		    }
	    },

		data() {
			return {
				authorityTree:[],
				isTreeRender:true,
				defaultProps: {
		         	children: 'children',
	         		label: 'name'
		        }
			}		
        },
	}
</script>
