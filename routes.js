/**
 * Parameterized Routing with next-route
 *
 * Benefits: Less code, and easily handles complex url structures
 * */
const routes = (module.exports = require('next-routes')());

routes.add('/save-the-date', '/save-the-date');
routes.add('/', '/splash');
routes.add('/home', '/home');
routes.add('/rsvp', '/rsvp');
routes.add('/faq', '/faq');
routes.add('/contact', '/contact');
