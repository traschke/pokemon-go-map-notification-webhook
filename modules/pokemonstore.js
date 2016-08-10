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

var pkmnStore = {
    add: function(pkmnMsg, callback) {
        if (typeof appearedPkmn[pkmnMsg.encounter_id] === 'undefined') {
            var pkmn = JSON.parse(JSON.stringify(pkmnMsg));
            var disappear_time = new Date(pkmn.disappear_time * 1000);

            pkmn.name = pokemonConfig[pkmn.pokemon_id].name;
            pkmn.time_until_hidden_formatted = msToTime(pkmn.time_until_hidden_ms);
            pkmn.disappear_time_formatted = disappear_time.getHours() + ':' + disappear_time.getMinutes() + ':' + disappear_time.getSeconds();
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