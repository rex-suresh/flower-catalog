const config = require(process.env.SERVER_CONFIG);
const { startServer } = require(config.server);
const { createRouter } = require(config.app);

const sessions = {};
const router = createRouter(config.public, sessions);
startServer(config.port, router);
