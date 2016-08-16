/**
 * Created by Timo on 10.08.2016.
 */

var logger = require('winston');
var NodeGeooder = require('node-geocoder');

var pokemonConfig = require('./../pokemon.json');
var config = require('./../config.json');

var geocoder = NodeGeooder({
    provider: 'google',
    httpAdapter: 'https',
    apiKey: config.gmapskey,
    formatter: null
});

var appearedPkmn = [];

var msToMMSS = function(duration) {
    var minutes = parseInt(Math.floor((duration / 1000) / 60));
    var seconds = parseInt((duration / 1000) - (minutes * 60));

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
};

var formatDate = function(date) {
    return addLeadingZero(date.getHours()) + ':' +
        addLeadingZero(date.getMinutes()) + ':' +
        addLeadingZero(date.getSeconds())
};

var addLeadingZero = function(val) {
    if (val >= 0 && val < 10) {
        return "0" + val;
    }
    return val;
};

var fillPkmn = function(pkmn, callback) {
    geocoder.geocode(pkmn.latitude + ', ' + pkmn.longitude, function(err, res) {
        var disappear_time = new Date(pkmn.disappear_time * 1000);

        pkmn.time_until_hidden_formatted = msToMMSS(pkmn.time_until_hidden_ms);
        pkmn.disappear_time_formatted = formatDate(disappear_time);
        pkmn.direction_href = 'https://www.google.com/maps/dir/Current+Location/' + pkmn.latitude + ',' + pkmn.longitude;

        if (!err) {
            pkmn.formattedAddress = res[0].formattedAddress;
        }
        callback(pkmn);
    });
};

var pkmnStore = {
    add: function(pkmnMsg, callback) {
        var pkmn = JSON.parse(JSON.stringify(pkmnMsg));

        pkmn.name = pokemonConfig[pkmn.pokemon_id].name;
        pkmn.rarity = pokemonConfig[pkmn.pokemon_id].rarity;

        if (config.rarity_filter == undefined || config.rarity_filter.indexOf(pkmn.rarity.toLowerCase()) > -1) {
            if (config.pokemon_filter == undefined || config.pokemon_filter.indexOf(pkmn.pokemon_id) > -1) {
                if (typeof appearedPkmn[pkmnMsg.encounter_id] === 'undefined') {
                    fillPkmn(pkmn, function(pkmn) {
                        appearedPkmn[pkmn.encounter_id] = pkmn;
                        logger.debug('Pokémon Store: Added %s (%s)!', pokemonConfig[pkmn.pokemon_id].name,
                            pkmnMsg.encounter_id);
                        callback(pkmn);
                    });
                } else {
                    logger.debug('Pokémon Store: %s (%s) already seen! Skipping...',
                        pokemonConfig[pkmnMsg.pokemon_id].name, pkmnMsg.encounter_id);
                }
            } else {
                logger.debug('Pokémon filter: Skipping %s.', pkmn.name);
            }
        } else {
            logger.debug('Rarity filer: Skipping %s %s.', pkmn.rarity, pkmn.name);
        }
    }
};

module.exports = pkmnStore;