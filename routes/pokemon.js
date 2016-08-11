/**
 * Created by Timo on 10.08.2016.
 */

var express = require('express');
var Pushbullet = require('pushbullet');
var util = require('util');

var pkmnStore = require('./../modules/pokemonstore');

var config = require('./../config.json');
var localizer = require('./../modules/localizer');

var pusher = new Pushbullet(config.pushbullet.apikey);
var pokemon = express.Router();

pokemon.route('/')
    .post(function (req, res, next) {
        //console.log(req.body.message);
        pkmnStore.add(req.body.message, callback);
        res.status = 200;
        res.end();
    });

var callback = function(pkmn) {
    if (pkmn.rarity != 'Common') {
        var localizedPkmn = localizer.getLocalizedPokmemon(pkmn);
        var msg = localizer.getLocalizedString('pokemon_message');
        msg = util.format(msg, localizedPkmn.name, localizedPkmn.rarity, localizedPkmn.time_until_hidden_formatted,
            localizedPkmn.disappear_time_formatted, localizedPkmn.direction_href);
        console.log(msg);
        pusher.note(config.pushbullet.devices, 'Pokémon GO', msg, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    }
};

module.exports = pokemon;