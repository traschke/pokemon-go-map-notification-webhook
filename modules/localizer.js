/**
 * Created by Timo on 11.08.2016.
 */

var config = require('./../config.json');
var locale = require('./../locales/en.json');
var pokemonConfig = require('./../pokemon.json');

if (config.locale != undefined) {
    locale = require('./../locales/' + config.locale + '.json')
}

var localizer = {
    getLocalizedString: function (str) {
        if (locale[str] != undefined) {
            return locale[str];
        }
        return str;
    },
    getLocalizedPokmemon: function(pkmn) {
        var localizedPkmn = JSON.parse(JSON.stringify(pkmn));
        localizedPkmn.name = localizer.getLocalizedString(pokemonConfig[localizedPkmn.pokemon_id].name);
        localizedPkmn.rarity = localizer.getLocalizedString(pokemonConfig[localizedPkmn.pokemon_id].rarity);
        return localizedPkmn;
    }
};

module.exports = localizer;