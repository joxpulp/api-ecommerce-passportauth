/**
 * https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
	apps: [
		{
			name: 'SERVER FORK',
			script: 'dist/index.js',
			watch: true,
			autorestart: true,
			args: '--port=8081',
		},
		{
			name: 'SERVER CLUSTER',
			script: 'dist/index.js',
			watch: true,
			autorestart: true,
			args: '--port=8082 --MODE=CLUSTER',
		}
	],
};
