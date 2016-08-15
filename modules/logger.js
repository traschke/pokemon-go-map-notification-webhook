/**
 * Created by Timo on 15.08.2016.
 */

var winston = require('winston');
var config = require('./../config.json');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    level: config.loglevel,
    colorize: true,
    prettyPrint: function (object) {
        return JSON.stringify(object);
    },
    timestamp: function() {
        return (new Date()).toLocaleString();
    }
});

var stream = {
    write: function (message, encoding) {
        winston.info(message.slice(0, -1));
    }
};

module.exports.stream = stream;