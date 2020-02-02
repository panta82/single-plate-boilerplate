<template>
	<div class="Sidebar">
		<Logo />

		<BoilerplateSelect :boilerplates="boilerplates" v-model="boilerplate" />

		<div v-if="boilerplate && options">
			<FieldAdapter
				v-for="field in boilerplate.fields"
				:field="field"
				v-model="options[field.key]"
			/>
		</div>

		<ArrowIcon v-if="!boilerplate" />
	</div>
</template>

<script>
import Logo from './widgets/Logo.vue';
import FieldAdapter from './fields/FieldAdapter.vue';
import BoilerplateSelect from './widgets/BoilerplateSelect';
import ArrowIcon from './widgets/ArrowIcon';

export default {
	name: 'Sidebar',
	props: ['boilerplates'],
	data() {
		return {
			/** @type {Boilerplate} */
			boilerplate: null,
			options: null,
		};
	},
	computed: {
		enabledOptions: function() {
			// if (!this.options) {
			// 	return null;
			// }
			// return this.options.filter(option => {
			// 	if (!option.condition) {
			// 		return true;
			// 	}
			// 	return option.condition();
			// });
		},
	},
	watch: {
		options: {
			handler(options) {
				if (this.boilerplate) {
					this.$store.put('options.' + this.boilerplate.id, options);
				}
				this.$emit('options', options);
			},
			deep: true,
		},
		boilerplate() {
			if (this.boilerplate) {
				this.options = this.$store.get(
					'options.' + this.boilerplate.id,
					this.boilerplate.generateDefaultOptions()
				);
			}
			this.$emit('boilerplate', this.boilerplate);
		},
	},
	components: {
		Logo,
		BoilerplateSelect,
		FieldAdapter,
		ArrowIcon,
	},
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
<style>
.Sidebar .ArrowIcon {
	text-align: center;
	animation: bouncing 1.5s ease 0s infinite normal;
	margin-top: 30px;
}
.Sidebar .ArrowIcon svg {
	fill: rgba(0, 0, 0, 0.1);
}

@keyframes bouncing {
	0% {
		transform: translateY(0);
	}
	30% {
		transform: translateY(-10px);
	}
	80% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(0);
	}
}
</style>
