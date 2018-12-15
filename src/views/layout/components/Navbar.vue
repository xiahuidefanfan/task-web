<template>
	<div>
	  	<el-menu class="navbar" mode="horizontal">
	  	<div class="left-log">
	  		<router-link to="/dashboard">TEAM助手管理系统</router-link></div>
	    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
	    <!--<breadcrumb></breadcrumb>-->
	    <div class="right-div">
	    	<!--欢迎词-->
	    	<div class="welcome-div"><span>[{{userInfo.userName}}]欢迎登录TEAM助手管理系统</span></div>
	    	<!--消息提示-->
	    	<div class="logout-div">
	    		<el-badge :value="20" :max="9" class="item">
	  				<a @click="updatePassword">
	    				<i class="el-icon-bell" style="font-size:20px;"></i>
	    			</a>
				</el-badge>
	    	</div>    	
	    	<!--修改密码-->
	    	<div class="logout-div">
	    		<a @click="updatePassword">
	    			<i class="el-icon-third-mima" style="font-size:18px;"></i>
	    		</a>
	    	</div>
	    	<!--LogOut-->
	    	<div class="logout-div">
	    		<!--<a :href="this.path">
	    			<i class="el-icon-third-dengchu" style="font-size:20px;"></i>
	    		</a>-->
	    		<a @click="logout">
	    			<i class="el-icon-third-dengchu" style="font-size:18px;"></i>
	    		</a>
	    	</div>
	    </div>
	    <!--<el-dropdown class="avatar-container" trigger="click">
	      <div class="avatar-wrapper">
	        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
	        <i class="el-icon-caret-bottom"></i>
	      </div>
	      <el-dropdown-menu class="user-dropdown" slot="dropdown">
	        <router-link class="inlineBlock" to="/">
	          <el-dropdown-item>
	            Home
	          </el-dropdown-item>
	        </router-link>
	        <el-dropdown-item divided>
	          <span @click="logout" style="display:block;">LogOut</span>
	        </el-dropdown-item>
	      </el-dropdown-menu>
	    </el-dropdown>-->
	  </el-menu>
	  <!--弹出窗口-->
	  <updatePassword ref="updatePassword" :user="user"></updatePassword>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import yinlian from '@/assets/img/yinlian.png'
import { getToken } from '@/utils/auth' // getToken from cookie
import updatePassword from '@/views/layout/components/updatePassword'
import { getUserInfoPwd } from '@/api/login' 
import {MessageBox} from 'element-ui'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    updatePassword
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data() {
    return {
    	dialogStatus: '',
    	userInfo: {
    		userName: ''
    	},
    	path: '/main/Logout.do',
    	yinlian,
    	user: {}
    }
	},
  created() {
  	// 初始化用户信息
		this.initUser()
	},
  methods: {
  	initUser() {
  		this.userInfo.userName = getToken()
  	},
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 修改密码
    updatePassword() {
    	//获得当前用户信息
    	getUserInfoPwd().then((response) => {
    		if (response.datas) {
    			this.user = response.datas.user
    			this.$refs["updatePassword"].show()
    		} else {
    			MessageBox({title:'提示信息', message:'您没有登录,请先登录!', type:'info'})
    		}
    	})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.yinlian_log{
	float: left;
	width: 60px;
	height: 55px;
	padding-top:25px;
}
.right-div{
	float: right;
	padding-right: 20px;
	/*color: rgb(157, 157, 157);*/
}
.welcome-div{
	font-size: 18px;
	float: left;
	padding-right: 40px;
	span:hover {
  	color: #FFFFFF;
  	background-color:transparent;
  }
}
.logout-div{
	/*font-size:small;*/
	float: left;
	padding-right: 20px;
}
.navbar {
	position: fixed;
	width: 100%;
	z-index: 1002;/*左侧菜单栏z-index:1001,在这里要大于1001，但是要小于2000（2000以上为弹出层）*/
    height: 58px;
    line-height: 58px;
    border-radius: 0px !important;
    color: #FFFFFF;
    background-color: #001528;
    border-bottom: 0;
    a:hover {
  	  color: rgb(157, 157, 157);
  	  background-color:transparent;
    }
    .left-log {
  	  font-size: 18px;
      line-height: 58px;
      height: 58px;
      float: left;
      width: 200px;
      color: #FFFFFF;
      background-color: #001528;
      padding-left:10px;
      border-right: solid 1px #304156;
      a:hover {
    	color: rgb(157, 157, 157);
  	    background-color:transparent;
      }
    }
  .hamburger-container {
    line-height: 68px;
    height: 58px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .item {
  	margin-top: 0px;
  	margin-right: 0px;
  	line-height: 20px;
  }
  /*.avatar-container {
    height: 58px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }*/
}
</style>

