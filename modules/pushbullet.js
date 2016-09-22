/**
 * Created by Timo on 12.08.2016.
 */

var logger = require('winston');
var Pushbullet = require('pushbullet');
var config = require('./../config.json');

var pusher = new Pushbullet(config.pushbullet.apikey);

var push = {
    push: function (title, message, link) {
        pusher.note(config.pushbullet.devices, title, message + '\n' + link, function(err, res) {
            if (err) {
                logger.error('Pushbullet Error: %s', err.message);
            } else {
                logger.debug('Pushbullet: Push sent!');
            }

        });
    }
};

module.exports = push;