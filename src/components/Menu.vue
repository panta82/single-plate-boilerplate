<template>
	<div class="Menu">
		<Logo />
	</div>
</template>

<script>
	import Logo from './widgets/Logo.vue';
  export default {
	  name: 'Menu',
	  components: {
		  Logo
	  }
  };
</script>

<style scoped>
	.Menu {
		background: #e8eced;
		border-right: 4px solid #dce0e0;
		min-height: 100%;
	}
</style>