var seneca = require('seneca')()
var math = require('./plugin.js');

seneca.use(math, {
    message: 'ok'
});
seneca.use({
    init: math,
    name: 'math',
    tag: 'tag0'
})

seneca.act({
    cmd: 'add',
    a: 10,
    b: 20
}, (err, result) => {
    console.log(result.value)
});