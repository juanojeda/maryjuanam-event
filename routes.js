/**
 * Parameterized Routing with next-route
 *
 * Benefits: Less code, and easily handles complex url structures
 * */
const routes = (module.exports = require('next-routes')());

routes.add('/', '/save-the-date');
routes.add('/splash', '/splash');
routes.add('/home', '/home');
routes.add('/rsvp', '/rsvp');
