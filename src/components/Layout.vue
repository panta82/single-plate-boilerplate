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
		height: 100vh;
	}

	.left {
		width: 265px;
		flex-shrink: 0;
		flex-grow: 0;
		overflow-y: scroll;
	}

	.right {
		flex-basis: 80%;
		flex-shrink: 1;
		flex-grow: 1;
		overflow-y: scroll;
	}
</style>
