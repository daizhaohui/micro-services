const Seneca = require('seneca')();

Seneca.add({
    role: 'test',
    cmd: 'add'
}, (message, done) => {
    var sum = message.a + message.b;
    done(null, {
        value: sum
    });
});

Seneca.act({
    role: 'test',
    cmd: 'add',
    a: 1,
    b: 2
}, (err, result) => {
    if (!err) {
        console.log(`1+2=${result.value}`)
    }
});