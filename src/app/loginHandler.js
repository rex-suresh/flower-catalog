const fs = require('fs');

const addSession = (sessions) => (req, res) => {
  const username = req.body.name;
  const time = new Date();
  const sessionId = time.getTime();

  sessions[sessionId] = {
    username,
    time: time.toLocaleDateString(),
    sessionId
  };

  res.cookie('sessionId', `${sessionId}`);
  res.send(`${username} is logged in !!!`);
};


const serveLoginPage = (sessions) => (req, res) => {
  const sessionId = req.cookies?.sessionId;
  const page = fs.readFileSync('public/loginPage.html', 'utf-8');
  
  if (!sessionId || !sessions[sessionId]) {
    res.send(page);
    return;
  }

  res.send('You are already logged in !');
};

const attachSession = (sessions) => (req, res, next) => {
  const session = sessions[req.cookies?.sessionId];
  if (session) {
    req.session = session;
    next();
    return;
  }
  next();
};

const checkCredentials = (sessions) => (req, res, next) => {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId || !sessions[sessionId]) {
    res.statusCode = 401;
    res.send('Entry Denied!!!');
    return;
  }

  next();
};

module.exports = {
  checkCredentials, attachSession, addSession, serveLoginPage
};
