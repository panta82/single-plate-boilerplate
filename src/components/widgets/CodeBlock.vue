<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
	<div class="CodeBlock">
		<div class="title">{{title}}</div>
		<div v-bind:class="['code', copied && 'copied']">
			<pre v-highlightjs="code"><code v-bind:class="[language]"></code></pre>
			<button type="button"
				class="copy"
				@click="copyToClipboard">COPY</button>
		</div>
		<div class="instructions">{{instructions}}</div>
	</div>
</template>

<script>
	export default {
		name: 'CodeBlock',
		data: () => {
			return {
				copied: false
			};
		},
		props: [
			'code',
			'language',
			'title',
			'instructions'
		],
		methods: {
			copyToClipboard: function () {
				this.$copyText(this.code).then(() => {
					this.copied = true;
					setTimeout(() => {
						this.copied = false;
					}, 1);
				}, err => {
					alert(`Failed to copy to clipboard`);
					console.error(err);
				});
			}
		}
	};
</script>

<style scoped>
	.CodeBlock {}

	.title {
		color: #d1d5d5;
		font-size: 16px;
		margin: 5px;
	}

	.instructions {
		color: #b8baba;
		font-size: 12px;
		margin: 5px;
		font-style: italic;
	}

	.code {
		position: relative;
		border: 1px solid #a5a8a8;
	}
	.code pre {
		margin: 0;
	}
	.code code {
		transition: background-color 2s;
	}
	.code.copied code {
		transition: background-color 0s;
		background: #748899;
	}

	.copy {
		position: absolute;
		opacity: 0.7;
		bottom: 0;
		right: 0;
		background: #7828ee;
		color: white;
		cursor: pointer;
		transition: all 0.3s;
		font-weight: bold;
		font-size: 12px;
		padding: 4px;
		border: none;
	}
	.copy:hover {
		opacity: 1;
	}
</style>