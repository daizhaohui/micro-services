var seneca = require('seneca')();
var entities = require('seneca-entity');
var Promise = require('bluebird');

seneca.use(entities);

var student = seneca.make('student');

student.id = "1001";
student.name = "李红";
student.age = 20;
student.sex = 0;

var save$ = Promise.promisify(student.save$, {
    context: student
})
save$().then(console.log).catch(console.error);

student = student.make$();
student.id = "1002";
student.name = "王刚";
student.age = 18;
student.sex = 1;
save$ = Promise.promisify(student.save$, {
    context: student
})
save$().then(console.log).catch(console.error);


var stu = seneca.make('student');
stu.load$('1001', (err, info) => {
    console.log(`load:${JSON.stringify(info)}`)
});

stu.list$({}, (err, info) => {
    console.log(`lists:${JSON.stringify(info)}`)
})