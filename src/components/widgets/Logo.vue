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
		font-weight: bold;
		margin: 10px;
		cursor: default;
		text-align: center;
	}

	.Logo > * {
		margin: -10px;
		padding: 0;
		text-shadow: -5px -5px 15px white;
		animation-name: glow;
		animation-duration: 3s;
		animation-direction: alternate;
		animation-iteration-count: infinite;
	}

	.Logo > :nth-child(1) {
		font-size: 71px;
		line-height: 60px;
	}

	.Logo > :nth-child(2) {
		font-size: 84px;
		line-height: 80px;
		animation-delay: 1s;
	}

	.Logo > :nth-child(3) {
		font-size: 38px;
		line-height: 38px;
		animation-delay: 2s;
	}

	@keyframes glow {
		from {
			text-shadow: -5px -5px 15px white;
		}
		to {
			text-shadow: 5px 5px 15px white;
		}
	}

</style>