import { Boilerplate, FIELD_TYPES } from '../lib/types';

function generateFunctionBody() {
	return `
  const libHttp = url.toString().startsWith('http://') ? require('http') : require('https');
  return new Promise((resolve, reject) => {
    const headers = options.headers || {};
    let body = options.body;
    const isStream = body && typeof body.pipe === 'function';
    if (body && typeof body === 'object' && !isStream) {
      try {
        body = JSON.stringify(body);
      } catch (err) {
        return reject(err);
      }
      headers['content-type'] = 'application/json';
    }
    const chunks = [];
    const req = libHttp.request(url, { ...options, headers }, (res) => {
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        let result = Buffer.concat(chunks);
        const contentType = res.headers['content-type'] || '';
        if (contentType.startsWith('text')) {
          return resolve(result.toString('utf8'));
        }
        try {
          result = JSON.parse(result.toString('utf8'));
        } catch (_) {}
        resolve(result);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (isStream) {
      body.pipe(req);
    } else {
      if (body) {
        req.write(body);
      }
      req.end();
    }
  });
  `.trim();
}

function generateJavascriptCode() {
	return `
/**
 * @param {string|URL} url
 * @param {{auth, method, body, headers}} options
 * @returns {Promise<*>}
 */
function fetch(url, options = {}) {
  ${generateFunctionBody()}
}`.trim();
}

function generateTypescriptCode() {
	return `
function fetch(url: string | URL, options: {auth?, method?: 'get' | 'post' | 'put' | 'patch' | 'delete', body?, headers?} = {}): Promise<any> {
	${generateFunctionBody()}
}`.trim();
}

const LANGUAGES = {
	javascript: 'javascript',
	typescript: 'typescript',
};

export default new Boilerplate({
	title: 'Node.js fetch function',
	description: `Simple one-page HTTP fetch function that can be pasted into scripts`,

	fields: [
		{
			key: 'language',
			label: 'Language',
			type: FIELD_TYPES.SELECT,
			options: [
				{ value: LANGUAGES.javascript, title: 'Javascript' },
				{ value: LANGUAGES.typescript, title: 'Typescript' },
			],
			defaultValue: LANGUAGES.javascript,
		},
	],

	blocks: [
		{
			language: ({ language }) => language,
			instructions: `Paste this into your code`,
			code: ({ language }) => {
				return language === LANGUAGES.javascript
					? generateJavascriptCode()
					: generateTypescriptCode();
			},
		},
	],
});
