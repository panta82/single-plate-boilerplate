<template>
	<div class="BoilerplateSelect field">
		<label :for="id">Pick your plate:</label>
		<v-select
			ref="select"
			label="title"
			maxHeight="60vh"
			:options="boilerplates"
			:inputId="id"
			:value="boilerplate"
			@input="$emit('input', $event)"
		>
			<template slot="option" slot-scope="option">
				<span class="option">
					<span>{{ option.title }}</span>
					<span>{{ option.description }}</span>
				</span>
			</template>
		</v-select>
	</div>
</template>

<script>
export default {
	name: 'BoilerplateSelect',
	props: ['boilerplate', 'boilerplates'],
	data() {
		return {
			id: 'BoilerplateSelect' + String(this._uid),
		};
	},
};
</script>

<style>
.BoilerplateSelect .option {
	display: block;
	padding: 5px 0;
}
.BoilerplateSelect .option > :first-child {
	display: block;
	font-weight: bold;
}
.BoilerplateSelect .option > :last-child {
	display: block;
	font-size: 14px;
	white-space: normal;
	line-break: auto;
	color: #737373;
}
.BoilerplateSelect .highlight .option > :last-child {
	color: #e8e8e8;
}
</style>
