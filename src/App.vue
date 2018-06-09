<template>
	<div id="App">
		<Layout>
			<template slot="left">
				<Menu v-on:options="options = $event" />
			</template>
			<template slot="right">
				<Content :options="options" />
			</template>
		</Layout>
	</div>
</template>

<script>
	import Layout from './components/Layout.vue';
	import Menu from './components/Menu.vue';
	import Content from './components/Content.vue';

	export default {
		name: 'App',
		data () {
			return {
				boilerplate: null,
				options: null
			};
		},
		components: {
			Layout,
			Content,
			Menu
		}
	};
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Fira+Sans:500,700');
	@import '~highlight.js/styles/ir-black.css';

	@import "styles/layout.css";
	@import 'styles/fields.css';
</style>
