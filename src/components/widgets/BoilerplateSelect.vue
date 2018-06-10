<template>
	<div class="BoilerplateSelect">
		<label :for="id">Pick your plate:</label>
		<v-select
				ref="select"
				label="title"
				:options="boilerplates"
				:inputId="id"
				:value="boilerplate"
				@input="$emit('input', $event)">
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
		props: [
			'boilerplate',
			'boilerplates'
		],
		data() {
			return {
				id: 'BoilerplateSelect' + String(this._uid)
			};
		}
	};
</script>

<style>
	.BoilerplateSelect .v-select {
		display: block;
	}

	label {
		color: #5a5a5a;
	}

	.BoilerplateSelect .v-select .dropdown-toggle {
		white-space: nowrap;
		border: 2px solid #5a5a5a;
		border-radius: 0;
		background: #f7f7f7;
		transition: all 0.3s;
	}

	.BoilerplateSelect .v-select.open .dropdown-toggle {
		border-color: #7828ee;
		background-color: white;
	}

	.BoilerplateSelect .v-select .selected-tag {
		position: absolute;
		max-width: calc(100% - 50px);
		overflow: hidden;
		vertical-align: middle;
		text-overflow: ellipsis;
	}

	.BoilerplateSelect .v-select .dropdown-toggle .clear {
		color: #5a5a5a;
		bottom: 6px;
	}

	.BoilerplateSelect .v-select .dropdown-toggle .open-indicator:before {
		border-color: #5a5a5a;
	}

	.BoilerplateSelect .v-select .dropdown-menu {
		border: 2px solid #7828ee;
		border-radius: 0;
		border-top: none;
		margin-top: -2px;
		background-color: white;
		overflow-y: auto;
	}
	.BoilerplateSelect .v-select .dropdown-menu li a {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.BoilerplateSelect .v-select .dropdown-menu li.highlight a {
		background-color: #7828ee;
	}

	.option {
		display: block;
		padding: 5px 0;
	}
	.option > :first-child {
		display: block;
		font-weight: bold;
	}
	.option > :last-child {
		display: block;
		font-size: 14px;
		white-space: normal;
		line-break: auto;
		color: #737373;
	}
	.highlight .option > :last-child {
		color: #e8e8e8;
	}

</style>