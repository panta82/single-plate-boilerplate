<template>
	<div class="Content">
		<section v-if="blocks">
			<CodeBlock
					v-for="block in blocks"
					:key="block.name"
					:language="block.language"
					:title="block.title"
					:code="block.code"
					:instructions="block.instructions"/>
		</section>
	</div>
</template>

<script>
	import CodeBlock from './widgets/CodeBlock.vue';

	export default {
		name: 'Menu',
		components: {
			CodeBlock
		},
		props: [
			'blocks'
		],
	};
</script>

<style scoped>
	.Content {
		background: linear-gradient(to bottom, #596876 0%, #262c32 100%);
		min-height: 100vh;
	}

	section {
		padding: 20px;
	}
</style>