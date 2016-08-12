/**
 * Created by Timo on 10.08.2016.
 */

var express = require('express');
var winston = require('winston');
var serviceManager = require('./../modules/servicemanager');
var util = require('util');

var pkmnStore = require('./../modules/pokemonstore');

var config = require('./../config.json');
var localizer = require('./../modules/localizer');

var pokemon = express.Router();

pokemon.route('/')
    .post(function (req, res, next) {
        pkmnStore.add(req.body.message, callback);
        res.status = 200;
        res.end();
    });

var callback = function(pkmn) {
    if (config.rarity_filter == undefined || config.rarity_filter.indexOf(pkmn.rarity.toLowerCase()) > -1) {
        if (config.pokemon_filter == undefined || config.pokemon_filter.indexOf(pkmn.pokemon_id) > -1) {
            var localizedPkmn = localizer.getLocalizedPokmemon(pkmn);
            var msg = localizer.getLocalizedString('pokemon_message');
            msg = util.format(msg, localizedPkmn.name, localizedPkmn.rarity, localizedPkmn.time_until_hidden_formatted,
                localizedPkmn.disappear_time_formatted);
            winston.debug('Parsed message: %s', msg);
            serviceManager.push('Pokémon GO', msg, localizedPkmn.direction_href);
        } else {
            winston.debug('Pokémon filter: Skipping %s.', pkmn.name);
        }
    } else {
        winston.debug('Rarity filer: Skipping %s %s.', pkmn.rarity, pkmn.name);
    }
};

module.exports = pokemon;