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

function generateSecurity(enabled, headers, https) {
	if (!enabled) {
		return '';
	}

	return `
	## Do not display server info in responses
	server_tokens off;
	
	${
		headers
			? `
	## Security headers
	add_header X-Frame-Options "SAMEORIGIN" always;
	add_header X-XSS-Protection "1; mode=block" always;
	add_header X-Content-Type-Options "nosniff" always;
	add_header Referrer-Policy "no-referrer-when-downgrade" always;
	add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
	add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always; `
			: ''
	}
	
	${
		https
			? `
	## SSL security
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;
	
	## Diffie-Hellman parameter for DHE ciphersuites
	ssl_dhparam /etc/nginx/dhparam.pem;

	## Mozilla Intermediate configuration
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

	## OCSP Stapling
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
	resolver_timeout 2s;
	`
			: ''
	}
	`;
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

function generateHttps({ name, letsEncrypt, strictSecurity }) {
	return `
## HTTPS
server {
	listen 443 ssl;

	## Server name
  server_name ${name};

	## SSL Certificate
	ssl_certificate ${httpsCertPath({ name, letsEncrypt })};
	ssl_certificate_key ${httpsPrivKeyPath({ name, letsEncrypt })};
	
	${generateSecurity(strictSecurity, true, true)}
	
	${generateResponse({ name })}
}
`;
}

function generateHttp({ name, customLogs, https, letsEncrypt, httpRedirect, strictSecurity }) {
	return `
server {
	listen 80;
	server_name ${name};

	${
		customLogs
			? `## Customized log files
	access_log  /var/log/nginx/${tokenizedName(name)}_access.log;
	error_log   /var/log/nginx/${tokenizedName(name)}_error.log;`
			: ''
	}
	
	${generateSecurity(strictSecurity, !https || !httpRedirect, false)}

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
}`;
}

function generateConfig(options) {
	return `
${generateHttp(options)}

${options.https ? generateHttps(options) : ''}
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
			key: 'strictSecurity',
			label: 'Strict security?',
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
