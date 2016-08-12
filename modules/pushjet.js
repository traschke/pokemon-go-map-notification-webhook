/**
 * Created by Timo on 12.08.2016.
 */

var Pushjet = require('pushjet');
var config = require('./../config.json');

var pusher = new Pushjet(config.pushjet.endpoint);


var push = {
    push: function (title, message, link) {
        pusher.sendMessage(config.pushjet.secret, message, title, 1, link)
            .then(function (status) {
                console.log('Status:', status);
            })
            .catch(function (error) {
                console.log('Error:', error);
            });
    }
};

module.exports = push;