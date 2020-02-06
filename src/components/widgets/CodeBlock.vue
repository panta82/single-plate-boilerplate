<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
	<div class="CodeBlock">
		<div :class="{ wrapper: true, 'with-preview': enablePreview }">
			<section class="content">
				<div class="header">
					<div class="language">{{ language }}</div>
					<div class="title">{{ title }}</div>
				</div>
				<div v-bind:class="['code', copied && 'copied']">
					<pre v-highlightjs="code"><code v-bind:class="[language]"></code></pre>
					<button v-if="showTopCopyButton" type="button" class="copy top" @click="copyToClipboard">
						COPY
					</button>
					<button type="button" class="copy bottom" @click="copyToClipboard">COPY</button>
				</div>
			</section>
			<section class="preview" v-if="enablePreview">
				<div class="header">
					<div class="language">PREVIEW</div>
				</div>
				<iframe
					class="preview-html"
					v-if="language === 'html'"
					:srcdoc="code"
					sandbox="allow-scripts"
					src="about:blank"
				>
				</iframe>
			</section>
		</div>
		<div class="instructions">{{ instructions }}</div>
	</div>
</template>

<script>
const PREVIEW_LANGUAGES = {
	html: 'html',
};

export default {
	name: 'CodeBlock',
	data: () => {
		return {
			copied: false,
		};
	},
	props: ['code', 'language', 'title', 'instructions'],
	computed: {
		enablePreview() {
			return PREVIEW_LANGUAGES[this.language];
		},
		showTopCopyButton() {
			return this.code && this.code.split(/\r\n|\n\r|\r|\n/).length > 20;
		},
	},
	methods: {
		copyToClipboard: function() {
			this.$copyText(this.code).then(
				() => {
					this.copied = true;
					setTimeout(() => {
						this.copied = false;
					}, 1);
				},
				err => {
					alert(`Failed to copy to clipboard`);
					console.error(err);
				}
			);
		},
	},
};
</script>

<style scoped>
.wrapper.with-preview {
	display: flex;
	flex-direction: row;
}
.wrapper.with-preview > * {
	width: 50%;
	position: relative;
}

.preview iframe {
	width: 100%;
	height: calc(100% - 29px);
	border: 1px solid #a5a8a8;
}

.language {
	background-color: #a5a8a8;
	text-transform: uppercase;
	display: inline-block;
	padding: 2px 5px;
	font-size: 14px;
	font-weight: bold;
}

.title {
	color: #d1d5d5;
	font-size: 16px;
	margin: 5px 10px;
	display: inline-block;
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
	tab-size: 2;
}

.code.copied code {
	transition: background-color 0s;
	background: #748899;
}

.copy {
	position: absolute;
	opacity: 0.7;
	background: var(--primary);
	color: white;
	cursor: pointer;
	transition: all 0.3s;
	font-weight: bold;
	font-size: 12px;
	padding: 4px;
	border: none;
}
.copy.top {
	top: 0;
	right: 0;
}
.copy.bottom {
	bottom: 0;
	right: 0;
}
.copy:hover {
	opacity: 1;
}
</style>
