module.exports = function (options) {
    var seneca = this;

    /** 
     * 获取所有商品列表
     */
    seneca.add({
        area: "product",
        action: "fetch"
    }, (args, done) => {
        var products = seneca.make$("products");
        products.list$({}, done);
    });

    /** 
     * 获取指定类别的商品列表
     */
    seneca.add({
        area: "product",
        action: "fetch",
        criteria: "byCategory"
    }, (args, done) => {
        var products = seneca.make$("products");
        products.list$({
            category: args.category
        }, done);
    });

    /**
     * 根据Id获取商品
     */
    seneca.add({
        area: "product",
        action: "fetch",
        criteria: "byId"
    }, (args, done) => {
        var product = seneca.make$("products");
        product.list$({}, (err, result) => {
            done(err, result.length > 0 ? result[0] : {});
        });
    });

    /**
     * 添加商品
     */
    seneca.add({
        area: "product",
        action: "add"
    }, (args, done) => {
        var product = seneca.make$("products");
        product.category = args.category;
        product.name = args.name;
        product.description = args.description;
        product.price = args.price;
        product.save$((err, result) => {
            console.log(err);
            done(err, product.data$(false));
        });
    });

    /** 
     * 根据id删除指定商品
     */
    seneca.add({
        area: "product",
        action: "remove"
    }, (args, done) => {
        var product = seneca.make$("products");
        product.remove$(args.id, err => {
            done(err, null);
        })
    });

    /** 
     * 编辑商品
     */
    seneca.add({
        area: "product",
        action: "edit"
    }, (args, done) => {
        seneca.act({
            area: "prodct",
            action: "fetch",
            criteria: "byId",
            id: args.id
        }, (err, result) => {
            if (!err) {
                result.data$({
                    name: args.name,
                    category: args.category,
                    description: args.description.description,
                    price: args.price
                });
                result.save$((err, product) => {
                    done(err, product.data$(false));
                });
            } else {
                done(err, null);
            }
        });
    });
    return "product"
}