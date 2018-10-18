var app = require("express")();
var seneca = require('seneca')();
var web = require('seneca-web');

var emailService = require("seneca")().client({
    type: 'tcp',
    port: 8001
}).use('entity');
var productService = require("seneca")().client({
    type: 'tcp',
    port: 8002
}).use('entity');
var orderService = require("seneca")().client({
    type: 'tcp',
    port: 8003
}).use('entity');

let routes = [{
    prefix: '/api',
    pin: 'area:ui,action:*',
    map: {
        products: {
            GET: true
        },
        productybyid: {
            GET: true,
            suffix: '/:id'
        },
        createorder: {
            POST: true
        }
    }
}];
let config = {
    context: app,
    routes: routes,
    adapter: require('seneca-web-adapter-express')
};

const api = function (options) {
    var seneca = this;

    seneca.add({
        area: "ui",
        action: "products"
    }, (args, done) => {
        productService.act({
            area: "product",
            action: "fetch"
        }, (err, result) => {
            done(err, result);
        });
    });

    seneca.add({
        area: "ui",
        action: "productybyid"
    }, (args, done) => {
        try {
            productService.act({
                area: "product",
                action: "fetch",
                criteria: "byId",
                id: args.args.params.id
            }, (err, result) => {
                done(err, result);
            });
        } catch (err) {
            console.log(err);
        }

    });

    seneca.add({
        area: "ui",
        action: "createorder"
    }, (args, done) => {
        var orderInfo = args.body;
        productService.act({
            area: "product",
            action: "fetch",
            criteria: "byId",
            id: orderInfo.id
        }, (err, product) => {
            if (err) done(err, null);
            order.act({
                area: "orders",
                action: "create",
                products: [product],
                email: orderInfo.email,
                name: orderInfo.name
            }, (err, order) => {
                done(err, order);
            });
        });
    });
};
module.exports = api;
seneca.use(api).use(web, config).ready(() => {
    var server = seneca.export('web/context')();
    server.listen('3000', () => {
        console.log('server started on: 3000')
    })
});
app.get('/', (req, res) => {
    res.send("hello,world!");
});