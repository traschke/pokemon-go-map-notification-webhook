/**
 * Created by Timo on 12.08.2016.
 */

var winston = require('winston');
var Pushbullet = require('pushbullet');
var config = require('./../config.json');

var pusher = new Pushbullet(config.pushbullet.apikey);

var push = {
    push: function (title, message, link) {
        pusher.note(config.pushbullet.devices, title, message + '\n' + link, function(err, res) {
            if (err) {
                winston.error('Pushbullet Error: %s', err.message);
            } else {
                winston.debug('Pushbullet: Push sent!');
            }

        });
    }
};

module.exports = push;