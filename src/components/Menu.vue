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
		background:linear-gradient(to bottom, #dde1e2 0%, #e8eced 100%);
				;
		border-right: 6px solid #d2d6d6;
		min-height: 100%;
	}
</style>