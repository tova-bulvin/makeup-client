export const environment = {
  production: true,
  development: true,
	
	apiServer: {
		useHttps: false,
		serverUrl: 'makeup4userver.somee.com',
		fullAddress: function() {
			let protocol = environment.apiServer.useHttps ? 'https' : 'http';
			let address = environment.apiServer.serverUrl;
			//let port = environment.apiServer.port && environment.apiServer.port > 0 ? `:${environment.apiServer.port}` : '';
	
			return `${protocol}://${address}/`;
		}
	},
};
