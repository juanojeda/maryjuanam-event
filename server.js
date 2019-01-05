/**
 * server.js
 *
 * You can use the default server.js by simply running `next`,
 * but a custom one is required to do paramaterized urls like
 * blog/:slug.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * BENEVOLENT WEB LLC BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createServer } = require('http');
const { parse } = require('url');
const { join } = require('path');
const { createProxyServer } = require('http-proxy');
const routes = require('./routes');

const handle = routes.getRequestHandler(app);
app.prepare().then(() => {
  const rootStaticFiles = [/^\/\w*icon.*\.(png|ico)/, /^\/manifest\.json/, /^\/browserconfig\.xml/];

  let proxy;

  if (dev) {
    proxy = createProxyServer({ ignorePath: true });
  }

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    const isStaticFile = rootStaticFiles.reduce(
      (isStaticFileYet, staticFileRE) => staticFileRE.test(parsedUrl.pathname) || isStaticFileYet,
      false,
    );

    if (isStaticFile) {
      const path = join(__dirname, 'static', parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else if (dev && req.url.indexOf('/api/') > -1) {
      const [_, reqPath] = req.url.split('/api/');
      proxy.web(req, res, { target: `http://localhost:9000/${reqPath}` });
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
