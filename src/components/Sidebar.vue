<template>
	<div class="Sidebar">
		<Logo/>

		<BoilerplateSelect :boilerplates="boilerplates" v-model="boilerplate"/>

		<div v-if="boilerplate && options">
			<FieldAdapter
					v-for="option in boilerplate.options"
					:option="option"
					v-model="options[option.key]" />
		</div>
	</div>
</template>

<script>
	import Logo from './widgets/Logo.vue';
	import FieldAdapter from './fields/FieldAdapter.vue';
	import BoilerplateSelect from './widgets/BoilerplateSelect';

	import {generateDefaultOptions} from '../lib/tools';

	export default {
		name: 'Sidebar',
		props: ['boilerplates'],
		data() {
			return {
				boilerplate: null,
				options: null
			};
		},
		watch: {
			options: {
				handler(options) {
					this.$emit('options', options);
				},
				deep: true
			},
			boilerplate () {
				if (this.boilerplate) {
					this.options = generateDefaultOptions(this.boilerplate);
				}
				this.$emit('boilerplate', this.boilerplate);
			}
		},
		components: {
			Logo,
			BoilerplateSelect,
			FieldAdapter,
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