///////////////////////////////////////////////////
// koa web server for all APPs.
///////////////////////////////////////////////////
var http = require("http");
import _debug from 'debug'
const debug = _debug('app:bin:server')
import Koa from 'koa'
import Dayu from '../src/dayu';

const app = new Koa()
app.proxy = true;
app.use(async (ctx, next) => {
    const cookieHeader = ctx.headers.cookie;
    //ctx.originalQuery = ctx.query;
    //ctx.originalHref = ctx.request.href;
    console.log ("["+ctx.method+"] "+ctx.path+", query=", ctx.query, ", referer=", ctx.req.headers.referer, ", cookies=", cookieHeader);
    //console.log ("["+ctx.method+"] "+ctx.path+", query=", ctx.query, ", session=", ctx.session);

    var dayu = new Dayu ('<您的accessKeyId>', '<您的accessKeySecret>');
    var result = await dayu.sendSMSCode ('<手机号>', '123456', '1');
    ctx.body = result;
})

const host = 'localhost';
const port = 3000;

debug ("create server...");
http.createServer(app.callback()).listen(port);

debug(`Server is now running at http://${host}:${port}.`)

