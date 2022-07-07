const logOutHandler = (sessions) => (req, res, next) => {
  const path = req.url.pathname;
  if (path !== '/logout') {
    next();
    return;
  }
  
  const { username, sessionId } = req.session;
  
  if (!sessionId) {
    res.statusCode = 400;
    res.end('Yo ! LOGIN FIRST !!!');
    return;
  }
  

  delete sessions[sessionId];
  res.setHeader('Set-Cookie', `sessionId=${sessionId}; Max-age=0`);
  res.end(`${username} Logged out successfully`);
};

module.exports = { logOutHandler };
