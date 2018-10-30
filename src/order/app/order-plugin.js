var emailService = require('seneca')().client({
    type: 'tcp',
    port: 8001
}).use('entity');

module.exports = function (options) {
    var seneca = this;

    seneca.add({
        area: "orders",
        action: "fetch"
    }, (args, done) => {
        var orders = seneca.make$("orders");
        orders.list$({
            id: args.id
        }, done);
    });

    seneca.add({
        area: "orders",
        action: "delete"
    }, (args, done) => {
        var orders = seneca.make$("orders");
        orders.remove$({
            id: args.id
        }, (err) => {
            done(err, null);
        });
    });

    seneca.add({
        area: "orders",
        action: "create"
    }, (args, done) => {
        var products = args.products;
        var total = 0.0;
        products.forEach(product => {
            total += product.price;
        });
        var orders = seneca.make$("orders");
        orders.total = total;
        orders.customer_email = args.email;
        orders.customer_name = args.name;
        orders.save$((err, order) => {
            emailService.act({
                area: "email",
                action: "send",
                to: args.email,
                toName: args.name,
                content: "订单：",
                subject: "订单："
            }, done)
        });
    });
    return "order";
}