import { Boilerplate, FIELD_TYPES } from '../lib/types';

const TEMPLATES = {
	none: 'none',
	ejs: 'ejs',
	pug: 'pug',
};

function generateMain({ port, cors, templates, staticFiles }) {
	const imports = [
		`const http = require('http');`,
		staticFiles && `const libPath = require('path');`,
		'',
		`const express = require('express');`,
		`const bodyParser = require('body-parser');`,
	].filter(Boolean);

	const options = [`const port = process.env.PORT || ${port};`];

	const appSetup = [`const app = express();`, `app.use(bodyParser.json());`];

	const handlers = [];

	if (templates !== TEMPLATES.none) {
		handlers.push(
			`
app.get('/', (req, res, next) => {
	res.render('index');
});
		`.trim()
		);
	}

	const apiEndpoint = templates !== TEMPLATES.none || staticFiles ? '/api/v1/hello' : '/';
	handlers.push(
		`
app.get('${apiEndpoint}', (req, res, next) => {
	res.send({
		result: 'Hello, ' + (req.query.word || 'world')
	});
});
		`.trim()
	);

	const footer = [
		`
const server = http.createServer(app);
server.listen(port, () => {
	console.log(\`Listening on http://localhost:\${port}\`);
});
		`.trim(),
	];

	if (cors) {
		imports.push(`const cors = require('cors');`);
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
		appSetup.push(`\napp.use(express.static(libPath.resolve(__dirname, './public')));`);
	}

	return [
		imports.join('\n'),
		options.join('\n'),
		appSetup.join('\n'),
		handlers.join('\n\n'),
		footer.join('\n'),
	].join('\n\n');
}

function generateBash({ cors, templates }) {
	const modules = ['express', 'body-parser'];

	if (cors) {
		modules.push('cors');
	}

	if (templates === TEMPLATES.pug) {
		modules.push('pug');
	} else if (templates === TEMPLATES.ejs) {
		modules.push('ejs');
	}

	return `npm install --save ${modules.join(' ')}`;
}

export default new Boilerplate({
	title: 'Express.js app',
	description: `Single file node.js app with express server and a few standard features`,

	fields: [
		{
			key: 'port',
			label: 'Default port',
			type: FIELD_TYPES.NUMBER,
			defaultValue: 3000,
		},
		{
			key: 'templates',
			label: 'Template support',
			type: FIELD_TYPES.SELECT,
			options: [
				{ value: TEMPLATES.none, title: 'None' },
				{ value: TEMPLATES.ejs, title: 'EJS' },
				{ value: TEMPLATES.pug, title: 'Pug' },
			],
			defaultValue: TEMPLATES.none,
		},
		{
			key: 'cors',
			label: 'CORS?',
			type: FIELD_TYPES.TOGGLE,
			defaultValue: true,
		},
		{
			key: 'staticFiles',
			label: 'Static files',
			type: FIELD_TYPES.TOGGLE,
			defaultValue: false,
		},
	],

	blocks: [
		{
			title: null,
			language: 'javascript',
			instructions: 'Copy/paste this into your main code file',
			code: generateMain,
		},

		{
			title: null,
			language: 'bash',
			instructions: 'Execute this in your terminal',
			code: generateBash,
		},
	],
});
