/**
 * Created by Timo on 12.08.2016.
 */

var Pushbullet = require('pushbullet');
var config = require('./../config.json');

var pusher = new Pushbullet(config.pushbullet.apikey);

var push = {
    push: function (title, message, link) {
        pusher.note(config.pushbullet.devices, title, message + '\n' + link, function(err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Status:', res);
            }

        });
    }
};

module.exports = push;