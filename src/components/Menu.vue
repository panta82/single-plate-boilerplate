<template>
	<div class="Menu">
		<div class="logo-holder">
			<Logo />
		</div>
		<NumberField :label="boilerplate.options.port.label" v-model="options.port" />
		{{options.port}}
	</div>
</template>

<script>
	import Logo from './widgets/Logo.vue';
	import NumberField from './fields/NumberField.vue';

	import express from '../boilerplates/express.js';

  export default {
	  name: 'Menu',
		data () {
	  	const options = Object.keys(express.options).reduce((o, key) => {
				o[key] = express.options[key].default;
				return o;
			}, {});

	  	return {
	  		boilerplate: express,
				options
			};
		},
	  components: {
		  Logo,
			NumberField
	  }
  };
</script>

<style scoped>
	.Menu {
		background:linear-gradient(to bottom, #d7d8d9 0%, #edf1f2 100%);
				;
		border-right: 2px solid #d2d6d6;
		min-height: 100%;
	}

	.logo-holder {
		padding: 20px;
	}
</style>