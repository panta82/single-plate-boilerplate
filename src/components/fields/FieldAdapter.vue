<template>
	<NumberField
			v-if="option.type === 'Number'"
			:label="option.label"
			:value="value"
			@input="$emit('input', $event)"/>

	<ToggleField
			v-else-if="option.type === 'Toggle'"
			:label="option.label"
			:value="value"
			@input="$emit('input', $event)"/>

	<div v-else class="error">
		Unsupported field type: "{{option.type}}"
	</div>
</template>

<script>
	import NumberField from './NumberField.vue';
	import ToggleField from './ToggleField.vue';

	export default {
		name: 'FieldAdapter',
		props: [
			'option',
			'value'
		],

		components: {
			NumberField,
			ToggleField,
		}
	};
</script>

<style scoped>
	.error {
		color: red;
	}
</style>