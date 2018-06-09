<template>
	<div class="NumberField field">
		<div class="input-group">
			<label :for="id">{{label}}</label>
			<input type="number"
					:title="label"
					:id="id"
					v-bind:value="value"
					v-on:input="$emit('input', $event.target.value)" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NumberField',
		data () {
			return {
				id: null,
			}
		},
		props: [
			'label',
			'value'
		],
		mounted () {
			this.id = this._uid;
		}
	};
</script>