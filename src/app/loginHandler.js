const page = `<html>

<head>
  <title>Login Page</title>
</head>

<body>
  <div class="page">
    <form action="/login" method="post">
      <div>
        <label for="name">Username : </label>
        <input type="text" name="name" placeholder="enter your username" value="someone">
      </div>
      <input type="submit">
    </form>
  </div>
</body>

</html>
`

const loginHandler = (req, res, next) => {
  if (req.url.pathname === '/login' && !req.cookies.id) {
    if (req.method === 'POST') {
      const username = req.bodyParams.get('name');
      res.setHeader('Set-Cookie', 'id=1');
      res.end(`${username} is Logged in !!!`);
      return;
    }

    res.setHeader('Content-type', 'text/html');
    res.end(page);
    return;
  }

  if (!req.cookies.id) {
    res.end('Entry Denied!!!');
    return;
  }
  next();
};

module.exports = { loginHandler };
