const Seneca = require('seneca')();
const Promise = require('bluebird');
const SenecaWeb = require('seneca-web');
const Koa = require('koa');
const Adapter = require('seneca-web-adapter-koa2');
const koaBody = require('koa-body');
const Router = require('koa-router');

const app = new Koa();
const act = Promise.promisify(Seneca.act, Seneca);
const router = new Router();
const routes = [{
    prefix: '/api',
    pin: 'role:math,action:*',
    map: {
        add: {
            POST: true
        },
        subtract: {
            POST: true
        },
        mutiply: {
            POST: true
        },
        divide: {
            POST: true
        }
    }
}];
// const middleware = {
//     head: async function (ctx, next) {
//         ctx.type = 'application/json'
//         ctx.status = 200
//         await next()
//     },
//     res: async function (ctx) {
//         ctx.body = {
//             success: true
//         }
//     }
// };

Seneca.add({
    role: 'math',
    action: 'add'
}, (msg, reply) => {
    reply(null, {
        success: 1,
        result: msg.args.body.a + msg.args.body.b
    });
});

Seneca.add({
    role: 'math',
    action: 'subtract'
}, (msg, reply) => {
    reply(null, {
        success: 1,
        result: msg.args.body.a - msg.args.body.b
    });
});

Seneca.add({
    role: 'math',
    action: 'mutiply'
}, (msg, reply) => {
    reply(null, {
        success: 1,
        result: msg.args.body.a * msg.args.body.b
    });
});

Seneca.add({
    role: 'math',
    action: 'divide'
}, (msg, reply) => {
    reply(null, {
        success: 1,
        result: msg.args.body.a / msg.args.body.b
    });
});

router.get('/', (ctx, next) => {
    ctx.body = "hello,world!";
    next();
});

Seneca.use(SenecaWeb, {
    context: router,
    adapter: Adapter,
    routes: routes,
    options: {
        parseBody: false,
    }
}).ready(() => {
    app.use(koaBody()).use(Seneca.export('web/context')().routes()).use(router.allowedMethods());
    app.listen(3000);
});