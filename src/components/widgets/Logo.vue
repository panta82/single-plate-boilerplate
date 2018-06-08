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
		margin: 10px;
	}
	.Logo > * {
		margin: -10px;
		padding: 0;
	}
	.Logo > :nth-child(1) {
		font-size: 40px;
		line-height: 40px;
	}
	.Logo > :nth-child(2) {
		font-size: 58px;
		line-height: 58px;
	}
	.Logo > :nth-child(3) {
		font-size: 22px;
		line-height: 22px;
	}
</style>