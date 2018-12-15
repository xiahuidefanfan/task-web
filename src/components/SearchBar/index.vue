<template>
	<div class="search-bar-well">
		<slot></slot>
	</div>
</template>

<script>
	export default {
	  name: 'searchBar',
	  data() {
	  	return {
	  	}
	  }
	}
</script>

<style scoped>
	.search-bar-well{
		background-color: #f5f7fa;/*#f4f4f5*/
		margin-bottom: 9px;
	}
</style>
