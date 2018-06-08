<template>
	<div class="Layout">
		<div class="left">
			<Menu/>
		</div>
		<div class="right">
			<Content/>
		</div>
	</div>
</template>

<script>
	import Menu from './Menu.vue';
	import Content from './Content.vue';

	export default {
		name: 'Layout',
		components: {
			Content,
			Menu
		}
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
