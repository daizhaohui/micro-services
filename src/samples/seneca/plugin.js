module.exports = function (options) {

    //Default options
    options = this.util.deepextend({
        message: '',
    }, options)

    this.add({
        cmd: 'add'
    }, (args, done) => {
        done(null, {
            value: args.a + args.b,
            message: options.message
        })
    });

    this.add({
        cmd: 'mutiply'
    }, (args, done) => {
        done(null, {
            value: args.a * args.b,
            message: options.message
        })
    });

    console.log(this.context.name, this.context.tag, options)

    return {
        name: 'math'
    }
}