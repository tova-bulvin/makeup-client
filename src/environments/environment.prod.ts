export const environment = {
  production: true,
  development: true,
	
	apiServer: {
		useHttps: false,
		serverUrl: 'localhost:52718',
		fullAddress: function() {
			let protocol = environment.apiServer.useHttps ? 'https' : 'http';
			let address = environment.apiServer.serverUrl;
			//let port = environment.apiServer.port && environment.apiServer.port > 0 ? `:${environment.apiServer.port}` : '';
	
			return `${protocol}://${address}/`;
		}
	},
};
