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

	<SelectField
			v-else-if="option.type === 'Select'"
			:label="option.label"
			:value="value"
			:options="option.options"
			:default="option.default"
			@input="$emit('input', $event)"/>

	<div v-else class="error">
		Unsupported field type: "{{option.type}}"
	</div>
</template>

<script>
	import NumberField from './NumberField.vue';
	import ToggleField from './ToggleField.vue';
	import SelectField from './SelectField.vue';

	export default {
		name: 'FieldAdapter',
		props: [
			'option',
			'value'
		],

		components: {
			NumberField,
			ToggleField,
			SelectField,
		}
	};
</script>

<style scoped>
	.error {
		color: red;
	}
</style>