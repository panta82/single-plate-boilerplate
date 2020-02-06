import { Boilerplate, FIELD_TYPES } from '../lib/types';

function mainName(name) {
	return (name || '').split(' ')[0];
}

function tokenizedName(name) {
	return mainName(name).replace(/\./g, '_');
}

function confFileName(name) {
	return name ? tokenizedName(name) + '.nginx' : '';
}

function httpsCertPath({ name, letsEncrypt }) {
	return letsEncrypt
		? `/etc/letsencrypt/live/${mainName(name)}/fullchain.pem`
		: `ssl_certificate /root/${mainName(name)}.cert`;
}

function httpsPrivKeyPath({ name, letsEncrypt }) {
	return letsEncrypt
		? `/etc/letsencrypt/live/${mainName(name)}/privkey.pem`
		: `ssl_certificate /root/${mainName(name)}.key`;
}

function generateResponse({ name }) {
	return `
	## Increase max body size, to prevent strange errors
	client_max_body_size 200M;

	## Prevent problems with JWT token size
	large_client_header_buffers 8 64k;
	proxy_buffers         8 32k;  # Buffer pool = 8 buffers of 16k
	proxy_buffer_size     32k;    # 16k of buffers from pool used for headers

	location / {
		proxy_pass http://backend/;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $http_host;

		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto http;
		proxy_set_header X-Nginx-Proxy true;

		proxy_redirect off;
	}
`;
}

function generateHttps({ name, aliases, letsEncrypt, strictHttpsSecurity }) {
	return `
## HTTPS
server {
	listen 443 ssl;

	## Server name
  server_name ${name};

	## SSL Certificate
	ssl_certificate ${httpsCertPath({ name, letsEncrypt })};
	ssl_certificate_key ${httpsPrivKeyPath({ name, letsEncrypt })};

	${
		strictHttpsSecurity
			? `## Strict HTTPS security
	add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;";
	add_header X-Content-Type-Options nosniff;
	add_header X-Frame-Options "SAMEORIGIN";
	add_header X-XSS-Protection "1; mode=block";
	add_header X-Robots-Tag none;`
			: ''
	}
	
	${generateResponse({ name })}
}
`;
}

function generateConfig({
	name,
	customLogs,
	https,
	letsEncrypt,
	httpRedirect,
	strictHttpsSecurity,
}) {
	return `
server {
	listen 80;
	server_name ${name};
	server_tokens off;

	${
		customLogs
			? `## Customized log files
	access_log  /var/log/nginx/${tokenizedName(name)}_access.log;
	error_log   /var/log/nginx/${tokenizedName(name)}_error.log;`
			: ''
	}

	${
		https && letsEncrypt
			? `## Lets encrypt handler
	location '/.well-known/acme-challenge' {
		default_type "text/plain";
		root /tmp/letsencrypt;
	}`
			: ''
	}

	${
		https && httpRedirect
			? `## HTTPS redirect
	location / {
		return 301 https://$http_host$request_uri;
	}
	`
			: generateResponse({ name })
	}
}

${https ? generateHttps({ name, letsEncrypt, strictHttpsSecurity }) : ''}
`;
}

export default new Boilerplate({
	title: 'Nginx config',
	description: `Nginx virtual host boilerplate`,

	fields: [
		{
			key: 'name',
			label: 'Server name',
			type: FIELD_TYPES.TEXT,
			exampleValue: 'example.com www.example.com',
			helpText: 'Space-separated list of domains. Eg. "example.com www.example.com"',
		},
		{
			key: 'customLogs',
			label: 'Custom logs?',
			type: FIELD_TYPES.TOGGLE,
		},
		{
			key: 'https',
			label: 'Enable HTTPS?',
			type: FIELD_TYPES.TOGGLE,
		},
		{
			key: 'letsEncrypt',
			label: 'LetsEncrypt support?',
			type: FIELD_TYPES.TOGGLE,
			displayIf: options => options.https,
		},
		{
			key: 'httpRedirect',
			label: 'Redirect HTTP?',
			type: FIELD_TYPES.TOGGLE,
			displayIf: options => options.https,
		},
	],

	blocks: [
		{
			title: null,
			language: 'nginx',
			instructions: ({ name }) =>
				`Paste this into /etc/nginx/sites-available/${confFileName(name)}`,
			code: generateConfig,
		},

		{
			title: null,
			language: 'bash',
			instructions: 'Execute this in your terminal to enable the virtual host',
			code: ({ name }) =>
				`ln -s -T /etc/nginx/sites-available/${confFileName(
					name
				)} /etc/nginx/sites-enabled/${confFileName(name)}`,
		},
	],
});
