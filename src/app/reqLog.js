let reqCount = 0;
const reqLog = (req, res, next) => {
  const { method, url: { pathname } } = req;
  console.log(method, pathname, ++reqCount);
  console.log(req.headers);
  next();
};

module.exports = { reqLog };
