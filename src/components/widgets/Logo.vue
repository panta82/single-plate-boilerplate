<template>
	<div class="Logo">
		<p>Single</p>
		<p>Plate</p>
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
		font-size: 45px;
		line-height: 45px;
	}
	.Logo > :nth-child(2) {
		font-size: 54px;
		line-height: 54px;
	}
	.Logo > :nth-child(3) {
		font-size: 24px;
		line-height: 24px;
		margin-top: 3px;
	}
</style>