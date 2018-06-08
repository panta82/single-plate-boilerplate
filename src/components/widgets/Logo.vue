<template>
	<div class="Logo">
		<p>Single</p>
		<p>Page</p>
		<p>Boilerplate</p>
	</div>
</template>

<style scoped>
	.Logo {
		color: #7828ee;
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
		margin: 15px;
	}
	.Logo > * {
		margin: -15px;
		padding: 0;
	}
	.Logo > :nth-child(1) {
		font-size: 38px;
	}
	.Logo > :nth-child(2) {
		font-size: 53px;
	}
	.Logo > :nth-child(3) {
		font-size: 21px;
		margin-top: 5px;
	}
</style>