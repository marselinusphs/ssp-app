const Hapi = require('@hapi/hapi');
//const productsPlugin = require('./productsPlugin')
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  
  // await server.register({
  //   plugin: productsPlugin,
  //   options: { products: [] },
  // });

  server.route(routes);
  
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
