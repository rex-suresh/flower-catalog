const config = require(process.env.SERVER_CONFIG);
const { startServer } = require(config.server);
const { createRouter } = require(config.app);

const router = createRouter(config.public);
startServer(config.port, router);
