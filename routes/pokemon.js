/**
 * Created by Timo on 10.08.2016.
 */

var express = require('express');
var logger = require('winston');
var serviceManager = require('./../modules/servicemanager');
var util = require('util');

var pkmnStore = require('./../modules/pokemonstore');

var config = require('./../config.json');
var localizer = require('./../modules/localizer');

var pokemon = express.Router();

pokemon.route('/')
    .post(function (req, res, next) {
        //logger.silly(req.body);
        if (req.body.type == 'pokemon') {
            pkmnStore.add(req.body.message, callback);
        }
        res.status = 200;
        res.end();
    });

var callback = function(pkmn) {
    var localizedPkmn = localizer.getLocalizedPokmemon(pkmn);
    var msg = localizer.getLocalizedString('pokemon_message');
    msg = util.format(msg, localizedPkmn.name, localizedPkmn.rarity, localizedPkmn.time_until_hidden_formatted,
        localizedPkmn.disappear_time_formatted, localizedPkmn.formattedAddress);
    logger.debug('Parsed message: %s', msg);
    serviceManager.push('Pokémon GO', msg, localizedPkmn.direction_href);
};

module.exports = pokemon;