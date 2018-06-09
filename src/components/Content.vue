<template>
	<div class="Content">
		<section>
			<CodeBlock title="app.js" :code="code" instructions="Copy/paste this into your main code file" />
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
		data: () => {
			return {
				code: `const express = require('express');

const app = express();
`
			};
		}
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