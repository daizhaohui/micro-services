var seneca = require('seneca')();
var plugin = require('./email-plugin');

seneca.use(plugin).use("entity");
seneca.listen({
    type: 'tcp',
    port: 8001
});