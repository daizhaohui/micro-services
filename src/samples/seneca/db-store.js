var Seneca = require('seneca')();

Seneca.use('mongo-store', {
    uri: 'mongodb://127.0.0.1:27017/jrum_demo'
}).use("entity");

Seneca.ready(err => {
    var user = Seneca.make$('user');
    user.name = "test";
    user.password = 'test';
    user.chinese_name = '测试员';
    user.save$((err, data) => {
        if (err) return console.log(err);
        console.log(`user=${JSON.stringify(data)}`)
    });

});

Seneca.close(err => {
    console.log('database closed');
})