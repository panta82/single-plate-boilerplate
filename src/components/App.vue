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
				<Content :boilerplate="boilerplate" :options="options" />
			</template>
		</Layout>
	</div>
</template>

<script>
import Layout from './Layout.vue';
import Sidebar from './Sidebar.vue';
import Content from './Content.vue';

import { loadBoilerplates } from '../lib/tools';

const boilerplates = loadBoilerplates();

export default {
	name: 'App',

	data() {
		return {
			color: Math.floor(Math.random() * 360),
			options: null,

			/** @type {Boilerplate[]} */
			boilerplates,

			/** @type {Boilerplate} */
			boilerplate: null,
		};
	},

	mounted() {
		// TODO: Uncomment
		// this.colorInterval = setInterval(() => {
		// 	this.color = this.color < 360 ? this.color + 1 : 0;
		// }, 300);
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
@import '../../node_modules/highlight.js/styles/ir-black.css';
@import '../styles/variables.css';
@import '../styles/global.css';
@import '../styles/fields.css';
</style>
