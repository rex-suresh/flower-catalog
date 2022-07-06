const injectCookies = (req, res, next) => {
  const cookiesString = req.headers.cookie;
  let cookies = {};
  if (cookiesString) {
    cookies= parseCookies(cookiesString);
  }
  req.cookies = cookies;
  next();
};

const parseCookies = (cookieString) => {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  });

  return cookies;
};

module.exports = { injectCookies };
