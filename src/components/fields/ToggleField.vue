<template>
	<div class="ToggleField field">
		<label :for="id">
			<input type="checkbox"
					:id="id"
					:title="label"
					:checked="value"
					@change="$emit('input', $event.target.checked)" />
			{{label}}
		</label>
	</div>
</template>

<script>
	export default {
		name: 'ToggleField',
		data() {
			return {
				id: null,
			};
		},
		props: [
			'label',
			'value'
		],
		mounted() {
			this.id = this._uid;
		}
	};
</script>