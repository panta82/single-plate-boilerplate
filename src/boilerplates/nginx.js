import { Boilerplate, FIELD_TYPES } from '../lib/types';

function generateMain({ name }) {
	return `
		server {
			listen 0.0.0.0:80;
			server_name ${name};
			server_tokens off;

			## Individual nginx logs for this vhost
			access_log  /var/log/nginx/pantas_access.log;
			error_log   /var/log/nginx/pantas_error.log;

			## Lets encrypt server
			location '/.well-known/acme-challenge' {
				default_type "text/plain";
				root /tmp/letsencrypt;
			}

			## HTTPS redirect
			location / {
				return 301 https://$http_host$request_uri;
			}
	}
	`;
}

function confFileName(name) {
	return name ? name.replace(/\./g, '_') + '.nginx' : '';
}

export default new Boilerplate({
	title: 'Nginx config',
	description: `Nginx virtual host boilerplate`,

	fields: [
		{
			key: 'name',
			label: 'Server name (domain)',
			type: FIELD_TYPES.TEXT,
		},
		{
			key: 'https',
			label: 'Enable HTTPS?',
			type: FIELD_TYPES.TOGGLE,
		},
	],

	blocks: [
		{
			title: null,
			language: 'nginx',
			instructions: ({ name }) =>
				`Paste this into /etc/nginx/sites-available/${confFileName(name)}`,
			code: generateMain,
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
