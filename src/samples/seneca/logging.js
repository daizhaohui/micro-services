var Seneca = require('seneca')();

Seneca.add({
    cmd: 'salestax'
}, function (args, callback) {
    var rate = 0.23
    var total = args.net * (1 + rate)
    callback(null, {
        total: total
    })
});

Seneca.act({
    cmd: 'salestax',
    net: 100
}, function (err, result) {
    if (err) return console.error(err)
    console.log(result.total)
});