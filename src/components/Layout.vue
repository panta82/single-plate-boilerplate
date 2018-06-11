<template>
	<div class="Layout">
		<div class="left">
			<slot name="left"/>
		</div>
		<div class="right">
			<slot name="right"/>
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
		overflow-y: auto;
		align-items: stretch;
	}

	.left {
		width: 250px;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.right {
		flex-shrink: 1;
		flex-grow: 1;
		min-width: 0;
	}
</style>
