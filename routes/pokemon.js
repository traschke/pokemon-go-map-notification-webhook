/**
 * Created by Timo on 10.08.2016.
 */

var express = require('express');
var Pushbullet = require('pushbullet');

var pkmnStore = require('./../modules/pokemonstore');

var config = require('./../config.json');

var pusher = new Pushbullet(config.pushbullet.apikey);
var pokemon = express.Router();

pokemon.route('/')
    .post(function (req, res, next) {
        pkmnStore.add(req.body.message, callback);
        res.status = 200;
        res.end();
    });

var callback = function(pkmn) {
    if (pkmn.rarity != 'Common') {
        var msg = 'A wild ' + pkmn.rarity + ' ' + pkmn.name + ' (#' + pkmn.pokemon_id + ') appeared! It hides in ' +
            pkmn.time_until_hidden_formatted + ' (' + pkmn.disappear_time_formatted + ').\n' + pkmn.direction_href;
        // console.log(msg);
        pusher.note(config.pushbullet.devices, 'Pokémon GO', msg, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    }
};

module.exports = pokemon;