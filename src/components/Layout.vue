<template>
	<div class="Layout">
		<div class="left">
			<slot name="left" />
		</div>
		<div class="right">
			<slot name="right" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Layout',
	};
</script>

<style scoped>
	.Layout {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
	}
	.left {
		flex-basis: 20%;
		min-width: 200px;
		max-width: 300px;
		flex-shrink: 1;
		flex-grow: 1;
	}
	.right {
		flex-basis: 80%;
		flex-shrink: 1;
		flex-grow: 1;
	}
</style>
