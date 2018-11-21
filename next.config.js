const router = require('./routes');

module.exports = {
  exportPathMap: () => router.routes.reduce((acc, curr) => ({ ...acc, [curr.pattern]: { page: curr.page } }), {}),
};
