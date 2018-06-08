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
	@import url('https://fonts.googleapis.com/css?family=Fira+Sans:500,700');
	@import '~highlight.js/styles/ir-black.css';

	body, html {
		padding: 0;
		margin: 0;
	}

	#app {
		font-family: 'Fira Sans', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
