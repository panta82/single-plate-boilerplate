<template>
	<div id="app">
		<Layout />
	</div>
</template>

<script>
	import Layout from './components/Layout.vue';

	export default {
		name: 'app',
		components: {
			Layout
		}
	};
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Oxygen');

	body, html {
		padding: 0;
		margin: 0;
	}

	#app {
		font-family: 'Oxygen', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
