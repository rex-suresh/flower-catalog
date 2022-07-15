const logOutHandler = (sessions) => (req, res) => {
  const { username, sessionId } = req.session;
  delete sessions[sessionId];
  
  res.clearCookie('sessionId');
  res.send(`${username} Logged out successfully`);
};

module.exports = { logOutHandler };
