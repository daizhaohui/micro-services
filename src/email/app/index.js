var seneca = require('seneca')();
var plugin = require('./email-plugin');

seneca.use(plugin);
seneca.listen({
    host: "127.0.0.1",
    port: 8001
});