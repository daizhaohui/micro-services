const http = require('http');

http.createServer((req, rep) => {
    rep.write("hello,word!");
    rep.end();
}).listen(3001);