<template>
	<div class="Menu">
		<Logo />
		<NumberField />
	</div>
</template>

<script>
	import Logo from './widgets/Logo.vue';
	import NumberField from './fields/NumberField.vue';

	export default {
		name: 'Menu',
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
</style>