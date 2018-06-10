<template>
	<div class="Sidebar">
		<Logo/>

		<BoilerplateSelect :boilerplates="boilerplates" v-model="boilerplate"/>

		<!--<div v-if="boilerplate">-->
			<!--<NumberField :label="boilerplate.options.port.label" v-model="options.port"/>-->
		<!--</div>-->
	</div>
</template>

<script>
	import Logo from './widgets/Logo.vue';
	import NumberField from './fields/NumberField.vue';
	import BoilerplateSelect from './widgets/BoilerplateSelect';

	import express from '../boilerplates/express.js';

	export default {
		name: 'Sidebar',
		props: ['boilerplates'],
		data() {
			const options = Object.keys(express.options).reduce((o, key) => {
				o[key] = express.options[key].default;
				return o;
			}, {});

			return {
				boilerplate: null,
				options
			};
		},
		created() {
			// TODO
			//this.$emit('boilerplate', this.boilerplate);
			//this.$emit('options', this.options);
		},
		watch: {
			options: {
				handler(options) {
					this.$emit('options', options);
				},
				deep: true
			},
			boilerplate () {
				console.log('watch b');
				this.$emit('boilerplate', this.boilerplate);
			}
		},
		components: {
			Logo,
			BoilerplateSelect,
			NumberField,
		}
	};
</script>

<style scoped>
	.Sidebar {
		background: linear-gradient(to bottom, #d7d8d9 0%, #edf1f2 100%);
		/*border-right: 2px solid #d2d6d6;*/
		height: 100%;
		padding: 10px 10px;
	}

	.Logo {
		margin-bottom: 30px;
	}

	.BoilerplateSelect {
		margin-bottom: 20px;
	}
</style>