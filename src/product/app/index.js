var seneca = require("seneca")();
var plugin = require("./product-plugin");

seneca.use(plugin).use('basic').use('entity')
    .use("mongo-store", {
        name: "product",
        host: "localhost",
        port: 27017,
        options: {}
    });


seneca.ready(() => {
    seneca.listen({
        type: 'tcp',
        port: 8002
    });
});