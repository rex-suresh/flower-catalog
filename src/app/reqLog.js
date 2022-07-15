let reqCount = 0;
const reqLog = (req, res, next) => {
  console.log(req.method, req.url, ++reqCount);
  next();
};

module.exports = { reqLog };
