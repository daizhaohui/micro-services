var seneca = require('seneca')();
var plugin = require('./order-plugin')

seneca.use(plugin).use("entity").use("mongo-store", {
    name: "order",
    host: "localhost",
    port: 27017,
    options: {}
});

seneca.ready(() => {
    seneca.listen({
        type: 'tcp',
        port: 8003
    });
});