<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
		<keep-alive :include="cachedViews">
		<!--<router-view :key="key"></router-view>-->
		<router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  	cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
	margin-top: 58px;/**58px是navbar的高度**/
	position: relative;
	min-height:-webkit-calc(100vh - 92px); 
    min-height:-moz-calc(100vh - 92px);
    min-height: calc(100vh - 92px);
	height:-webkit-calc(100vh - 92px); 
	height:-moz-calc(100vh - 92px);
	height: calc(100vh - 92px);
	overflow-y: auto !important;
}
</style>
