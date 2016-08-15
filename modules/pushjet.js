/**
 * Created by Timo on 12.08.2016.
 */

var logger = require('winston');
var Pushjet = require('pushjet');
var config = require('./../config.json');

var pusher = new Pushjet(config.pushjet.endpoint);


var push = {
    push: function (title, message, link) {
        pusher.sendMessage(config.pushjet.secret, message, title, config.pushjet.level, link)
            .then(function (status) {
                logger.debug('Pushjet: Push sent!');
            })
            .catch(function (error) {
                logger.error('Pushjet error: %s', error.toString());
            });
    }
};

module.exports = push;