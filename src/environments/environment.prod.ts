export const environment = {
  production: true,
  development: true,
	
	apiServer: {
		useHttps: true,
		serverUrl: 'makeup4u.herokuapp.com',
		fullAddress: function() {
			let protocol = environment.apiServer.useHttps ? 'https' : 'http';
			let address = environment.apiServer.serverUrl;
			//let port = environment.apiServer.port && environment.apiServer.port > 0 ? `:${environment.apiServer.port}` : '';
	
			return `${protocol}://${address}/`;
		}
	},
};
