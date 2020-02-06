<template>
	<div class="TextField field">
		<label :for="id">{{ label }}:</label>
		<input
			type="text"
			:title="label"
			:id="id"
			:value="value"
			@input="$emit('input', $event.target.value)"
		/>
		<div v-if="helpText" class="field-help-text">{{ helpText }}</div>
	</div>
</template>

<script>
export default {
	name: 'TextField',
	data() {
		return {
			id: null,
		};
	},
	props: ['label', 'value', 'helpText'],
	mounted() {
		this.id = this._uid;
	},
};
</script>
