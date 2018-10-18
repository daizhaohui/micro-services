var seneca = require('seneca')();
var plugin = require('./order-plugin')

seneca.use(plugin).use('basic').use("entity").use("mongo-store", {
    uri: 'mongodb://127.0.0.1:27017/order'
});

seneca.ready(() => {
    seneca.listen({
        host: "127.0.0.1",
        port: 8003
    });
});