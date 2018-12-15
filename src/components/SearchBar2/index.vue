<template>
	<div>
		<div class="down collapse-btn text-center" @click="collapsed=false" v-show="collapsed"><i class="el-icon-caret-bottom"></i></div>
		<transition name="fade">
			<div v-show="!collapsed">
				<div class="search-bar-well">
					<slot></slot>
				</div>
				<div class="up collapse-btn text-center" @click="collapsed=true"><i class="el-icon-caret-top"></i></div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
	  name: 'searchBar2',
	  data() {
	  	return {
	  		collapsed: false
	  	}
	  }
	}
</script>

<style scoped>
	.search-bar-well{
		background-color: #f4f4f5;
	}
	.collapse-btn{
		 width: 100%;
		 height: 12px;
	}
	.down{
		margin-top: -10px;/*上移10px*/
	}
	.down:hover{
		cursor: pointer;
		background-color: #FFECEC;
	}
	.up:hover{
		cursor: pointer;
		background-color: #FFECEC;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>
