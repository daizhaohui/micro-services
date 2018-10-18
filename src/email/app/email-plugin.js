module.exports = function (options) {
    var seneca = this;

    seneca.add({
        area: "email",
        action: "send"
    }, (args, done) => {
        console.log(args);
        var message = {
            "html": args.content,
            "subject": args.subject,
            "to": [{
                "email": args.to,
                "name": args.toName,
                "type": "to"
            }],
            "from_email": "daniel.dai@beyonds.com",
            "from_name": "daizhaohui"
        };
        console.log(`sending message:${message}`);
        done(null, message);
    });
    return "email"
}