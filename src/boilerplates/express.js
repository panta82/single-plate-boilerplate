const TEMPLATES = {
	none: 'none',
	ejs: 'ejs',
	pug: 'pug'
};

function generateMain({port, cors, templates, staticFiles}) {
	const imports = [
		`const http = require('http');`,
		'',
		`const express = require('express');`,
	];
	
	const options = [
		`const port = process.env.PORT || ${port};`
	];
	
	const appSetup = [
		`const app = require('app');`,
	];
	
	const handlers = [
		`
app.get('/', (req, res, next) => {
	res.send({
		result: 'Hello world'
	});
});
		`.trim()
	];
	
	const footer = [
		`
const server = http.createServer(app);
server.listen(port, () => {
	console.log(\`Listening on http://localhost:\${port}\`);
});
		`.trim()
	];
	
	if (cors) {
		imports.push(`const cors = require('cors')`);
		appSetup.push(`app.use(cors());`);
	}
	
	let tmpl;
	switch (templates) {
		case TEMPLATES.ejs:
			tmpl = `app.set('view engine', 'ejs');`;
			break;
		case TEMPLATES.pug:
			tmpl = `app.set('view engine', 'pug');`;
			break;
	}
	if (tmpl) {
		appSetup.push(tmpl);
	}
	
	if (staticFiles) {
		appSetup.push(`\napp.use(express.static('public'))`);
	}
	
	return [
		imports.join('\n'),
		options.join('\n'),
		appSetup.join('\n'),
		handlers.join('\n'),
		footer.join('\n')
	].join('\n\n');
}

export default {
	title: 'Simple express.js app',
	description: `One file node.js app with express server, file parser and CORS handling.`,
	
	options: [
		{
			key: 'port',
			label: 'Default port',
			type: 'Number',
			default: 3000
		},
		{
			key: 'templates',
			label: 'Template support',
			type: 'Select',
			options: [
				{value: TEMPLATES.none, title: 'None'},
				{value: TEMPLATES.ejs, title: 'EJS'},
				{value: TEMPLATES.pug, title: 'Pug'},
			],
			default: TEMPLATES.none
		},
		{
			key: 'cors',
			label: 'CORS?',
			type: 'Toggle',
			default: true
		},
		{
			key: 'staticFiles',
			label: 'Static files',
			type: 'Toggle',
			default: false
		}
	],
	
	blocks: [
		{
			title: 'app.js',
			language: 'javascript',
			instructions: 'Copy/paste this into your main code file',
			code: generateMain
		}
	]
};