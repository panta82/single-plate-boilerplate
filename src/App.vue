<template>
	<div id="App" v-bind:style="appStyle">
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
			color: 260,
			boilerplates,
			boilerplate: null,
			options: null,
		};
	},

	mounted() {
		this.colorInterval = setInterval(() => {
			this.color = this.color < 360 ? this.color + 1 : 0;
		}, 300);
	},

	beforeDestroy() {
		clearInterval(this.colorInterval);
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
		appStyle() {
			return {
				'--primary': `hsl(${this.color}, 80%, 30%)`,
			};
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
