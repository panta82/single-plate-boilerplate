<template>
	<NumberField
		v-if="field.type === 'NUMBER'"
		:label="field.label"
		:value="value"
		@input="$emit('input', $event)"
	/>

	<TextField
		v-else-if="field.type === 'TEXT'"
		:label="field.label"
		:value="value"
		@input="$emit('input', $event)"
	/>

	<ToggleField
		v-else-if="field.type === 'TOGGLE'"
		:label="field.label"
		:value="value"
		@input="$emit('input', $event)"
	/>

	<SelectField
		v-else-if="field.type === 'SELECT'"
		:label="field.label"
		:value="value"
		:options="field.options"
		:default="field.default"
		@input="$emit('input', $event)"
	/>

	<div v-else class="error">Unsupported field type: "{{ field.type }}"</div>
</template>

<script>
import NumberField from './NumberField.vue';
import TextField from './TextField.vue';
import ToggleField from './ToggleField.vue';
import SelectField from './SelectField.vue';

export default {
	name: 'FieldAdapter',
	props: ['field', 'value'],

	components: {
		NumberField,
		TextField,
		ToggleField,
		SelectField,
	},
};
</script>

<style scoped>
.error {
	color: red;
}
</style>
