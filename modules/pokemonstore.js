/**
 * Created by Timo on 10.08.2016.
 */

var pokemonConfig = require('./../pokemon.json');

var appearedPkmn = [];

var msToTime = function(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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

var pkmnStore = {
    add: function(pkmnMsg, callback) {
        if (typeof appearedPkmn[pkmnMsg.encounter_id] === 'undefined') {
            var pkmn = JSON.parse(JSON.stringify(pkmnMsg));
            var disappear_time = new Date(pkmn.disappear_time * 1000);

            pkmn.name = pokemonConfig[pkmn.pokemon_id].name;
            pkmn.time_until_hidden_formatted = msToTime(pkmn.time_until_hidden_ms);
            pkmn.disappear_time_formatted = formatDate(disappear_time);
            pkmn.direction_href = 'https://www.google.com/maps/dir/Current+Location/' + pkmn.latitude + ',' + pkmn.longitude;
            pkmn.rarity = pokemonConfig[pkmn.pokemon_id].rarity;

            appearedPkmn[pkmn.encounter_id] = pkmn;
            callback(pkmn);
        } else {
            console.log('Pokemon already seen!');
        }
    }
};

module.exports = pkmnStore;