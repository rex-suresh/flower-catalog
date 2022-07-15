const startServer = (port, app) => {
  const onStart = () => console.log(`started server on port ${port}`);
  app.listen(port, onStart);
};

module.exports = { startServer };
