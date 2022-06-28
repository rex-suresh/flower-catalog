const { startServer } = require('./src/server/server.js');
const { createRouter } = require('./src/app.js');

const PORT = 80;
const router = createRouter('./public');
startServer(PORT, router);
