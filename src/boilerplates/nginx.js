import { Boilerplate, FIELD_TYPES } from '../lib/types';
import { normalizeCode } from '../lib/tools';

const NGINX_SERVER_TYPES = {
	none: 'none',
	proxy: 'proxy',
	static: 'static',
};

function mainName(name) {
	return (name || '').split(' ')[0];
}

function tokenizedName(name) {
	return mainName(name).replace(/\./g, '_');
}

function confFileName(name) {
	return name ? tokenizedName(name) + '.nginx' : '';
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
	## NOTE: To generate, run: openssl dhparam -dsaparam -out /etc/nginx/dhparam.pem 4096
	## ssl_dhparam /etc/nginx/dhparam.pem;

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

function generateProxyResponse({ proxyBackend }) {
	return `
	## Proxy pass
	location / {
		proxy_pass ${proxyBackend};
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $http_host;

		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto http;
		proxy_set_header X-Nginx-Proxy true;

		proxy_redirect off;
	}`;
}

function generateResponse({ serverType, proxyBackend }) {
	const responseDef =
		serverType === NGINX_SERVER_TYPES.proxy ? generateProxyResponse({ proxyBackend }) : '';

	return (
		`
	## Increase max body size, to prevent strange errors
	client_max_body_size 200M;

	## Prevent problems with JWT token size
	large_client_header_buffers 8 64k;
	proxy_buffers               8 32k;
	proxy_buffer_size             32k;
` + responseDef
	);
}

function generateHttps({ name, letsEncrypt, strictSecurity, ...options }) {
	return `
## HTTPS
server {
	listen 443 ssl;

	## Server name
	server_name ${name};

	## SSL Certificate
	${
		letsEncrypt
			? `ssl_certificate /etc/letsencrypt/live/${mainName(name)}/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/${mainName(name)}/privkey.pem;`
			: `ssl_certificate /root/${mainName(name)}.cert;
	ssl_certificate_key /root/${mainName(name)}.key;`
	}
	
	${generateSecurity(strictSecurity, true, true)}
	
	${generateResponse(options)}
}
`;
}

function generateHttp({
	name,
	customLogs,
	https,
	letsEncrypt,
	httpRedirect,
	strictSecurity,
	...options
}) {
	return `
server {
	listen 80;
	server_name ${name};

	${
		customLogs
			? `## Customized log files
	access_log /var/log/nginx/${tokenizedName(name)}_access.log;
	error_log  /var/log/nginx/${tokenizedName(name)}_error.log;`
			: ''
	}
	
	${generateSecurity(strictSecurity, !https || !httpRedirect, false)}

	${
		https && letsEncrypt
			? `## Lets encrypt handler
	location '/.well-known/acme-challenge' {
		default_type "text/plain";
		root /var/letsencrypt_root;
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
			: generateResponse(options)
	}
}`;
}

function generateConfig(options) {
	return normalizeCode(`
${generateHttp(options)}

${options.https ? generateHttps(options) : ''}
`);
}

export default new Boilerplate({
	title: 'Nginx config',
	description: `Nginx virtual host with HTTP, HTTPS, proxy, static site and a custom letsencrypt setup.`,

	fields: [
		{
			key: 'name',
			label: 'Server name',
			type: FIELD_TYPES.TEXT,
			exampleValue: 'example.com www.example.com',
			helpText: 'Space-separated list of domains. Eg. "example.com www.example.com"',
		},
		{
			key: 'serverType',
			label: 'Server type',
			type: FIELD_TYPES.SELECT,
			options: [
				{ value: NGINX_SERVER_TYPES.proxy, title: 'Proxy' },
				{ value: NGINX_SERVER_TYPES.static, title: 'Static' },
			],
			defaultValue: null,
		},
		{
			key: 'proxyBackend',
			label: 'Proxy backend',
			type: FIELD_TYPES.TEXT,
			exampleValue: 'http://localhost:3000',
			helpText: 'Eg. "http://localhost:3000"',
			displayIf: options => options.serverType === NGINX_SERVER_TYPES.proxy,
		},
		{
			key: 'customLogs',
			label: 'Custom logs',
			type: FIELD_TYPES.TOGGLE,
		},
		{
			key: 'strictSecurity',
			label: 'Strict security',
			type: FIELD_TYPES.TOGGLE,
		},
		{
			key: 'https',
			label: 'Enable HTTPS',
			type: FIELD_TYPES.TOGGLE,
		},
		{
			key: 'letsEncrypt',
			label: 'Custom LetsEncrypt setup',
			type: FIELD_TYPES.TOGGLE,
			displayIf: options => options.https,
		},
		{
			key: 'httpRedirect',
			label: 'Redirect HTTP to HTTPS',
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
			title: 'Enable virtual host',
			language: 'bash',
			wrap: true,
			code: ({ name }) =>
				`ln -s -T /etc/nginx/sites-available/${confFileName(
					name
				)} /etc/nginx/sites-enabled/${confFileName(name)}`,
		},
		{
			title: 'Disable virtual host',
			language: 'bash',
			wrap: true,
			code: ({ name }) => `rm -f /etc/nginx/sites-enabled/${confFileName(name)}`,
		},
		{
			title: 'Check config and apply changes',
			language: 'bash',
			wrap: true,
			code: `nginx -t && systemctl reload nginx`,
		},
		{
			title: 'Prepare a temporary (fake) letsencrypt certificate',
			language: 'bash',
			wrap: true,
			instructions: `This will symlink a self-signed certificate that comes with debian in the place of letsencrypt certificate, allowing you to enable the site. As soon as HTTP is working, you should immediately do the next snippet.`,
			displayIf: ({ https, letsEncrypt }) => https && letsEncrypt,
			code: ({ name }) =>
				`mkdir -p /etc/letsencrypt/live/${mainName(name)} && ` +
				`ln -s -T /etc/ssl/private/ssl-cert-snakeoil.key /etc/letsencrypt/live/test.pantas.net/privkey.pem && ` +
				`ln -s -T /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/letsencrypt/live/test.pantas.net/fullchain.pem`,
		},
		{
			title: 'Obtain letsencrypt certificate',
			language: 'bash',
			wrap: true,
			instructions: `This will copy your current (fake?) certificate to /tmp and run certbot. If something goes wrong, we will try to revert the changes`,
			displayIf: ({ https, letsEncrypt }) => https && letsEncrypt,
			code: ({ name }) => {
				const certName = mainName(name);
				const domainArgs = name
					.split(/\s+/g)
					.map(site => '-d ' + site.trim())
					.join(' ');
				return (
					`{ [ -d /etc/letsencrypt/live/${certName}} ] && rm -rf /tmp/letsencrypt-save-${certName} && mv /etc/letsencrypt/live/${certName} /tmp/letsencrypt-save-${certName} ; } ; ` +
					`mkdir -p /var/letsencrypt_root && ` +
					`certbot certonly --webroot --webroot-path /var/letsencrypt_root ${domainArgs} || ` +
					`{ [ -d /tmp/letsencrypt-save-${certName} ] && mv /tmp/letsencrypt-save-${certName} /etc/letsencrypt/live/${certName} ; }`
				);
			},
		},
	],
});
