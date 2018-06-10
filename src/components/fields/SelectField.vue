<template>
	<div class="SelectField field">
		<label :for="id">{{label}}:</label>
		<v-select
				ref="select"
				label="title"
				:options="options"
				:inputId="id"
				:value="option"
				@input="onChange">
		</v-select>
	</div>
</template>

<script>
	export default {
		name: 'SelectField',
		data() {
			return {
				id: null,
			};
		},
		computed: {
			option () {
				return this.options.find(opt => opt.value === this.value);
			}
		},
		methods: {
			onChange($event) {
				let value = ($event && $event.value) || $event;
				if (!value) {
					value = this.default;
				}
				this.$emit('input', value);
			}
		},
		props: [
			'label',
			'value',
			'options',
			'default'
		],
		mounted() {
			this.id = 'SelectField' + this._uid;
		}
	};
</script>

<style>
	.SelectField button.clear {
		display: none !important;
	}
</style>