/**
 * Created by Timo on 12.08.2016.
 */

var config = require('./../config.json');

var services = [];

if (config.pushbullet != undefined) {
    services.push(require('./pushbullet'));
}

if (config.pushjet != undefined) {
    services.push(require('./pushjet'));
}

var serviceManager = {
    push: function (title, message, link) {
        for (var i = 0; i < services.length; i++) {
            services[i].push(title, message, link);
        }
    }
};

module.exports = serviceManager;