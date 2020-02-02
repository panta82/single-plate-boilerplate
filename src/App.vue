<template>
	<div id="App">
		<Layout>
			<template slot="left">
				<Sidebar
					:boilerplates="boilerplates"
					v-on:options="options = $event"
					v-on:boilerplate="boilerplate = $event"
				/>
			</template>
			<template slot="right">
				<Content
					:title="boilerplate && boilerplate.title"
					:description="boilerplate && boilerplate.description"
					:blocks="blocks"
				/>
			</template>
		</Layout>
	</div>
</template>

<script>
import Layout from './components/Layout.vue';
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';

import { generateBlockData, loadBoilerplates } from './lib/tools';

const boilerplates = loadBoilerplates();

export default {
	name: 'App',
	data() {
		return {
			boilerplates,
			boilerplate: null,
			options: null,
		};
	},

	components: {
		Layout,
		Content,
		Sidebar,
	},
	computed: {
		blocks() {
			if (!this.boilerplate || !this.options) {
				return null;
			}

			return generateBlockData(this.boilerplate, this.options);
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:500,700');
@import '~highlight.js/styles/ir-black.css';
@import 'styles/variables.css';
@import 'styles/global.css';
@import 'styles/fields.css';
</style>
