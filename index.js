const config = require(process.env.SERVER_CONFIG);
const { startServer } = require(config.server);
const { createRouter } = require(config.app);

const sessions = {};
const router = createRouter(config.public, sessions, true);

startServer(config.port, router);
