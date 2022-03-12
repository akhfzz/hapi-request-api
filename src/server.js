const hapi = require('@hapi/hapi');
const route = require('./routes');

// host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });

    server.route(route);

    await server.start();
    console.log(`Anda berjalan pada host ${server.info.uri}`);
};

init();
