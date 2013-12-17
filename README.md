League-api
=========

League-api is a Node.js wrapper for the official RIOT games League of Legends API. Pull requests and feedback are welcome!

##Installation

Install it through npm using the standard:

    $ npm install league-api

##Requirements

Get an API key at http://developer.riotgames.com/

##Usage and Examples

To initialize the module with your api key, use:

    var league_api = require('league-api');
    var league = new league_api('your_api_key');

###Available Methods

Each method takes as parameters some combination of a region, summoner id, summoner name, and then all methods have a callback function as a parameter. Here is an example call to retrieve the stat summary for a given id:

    league.getStatSummary('na', '5908', function(data) {
        console.log(data);
    });

Here is a list of all the methods in the module. `region`, `summoner id`, and `summoner_name` are all of type String. `summoner_ids` is a comma delineated string of summoner ids:

    getChampions(region, callback);

    getLeagues(region, summoner_id, callback);

    getGames(region, summoner_id, callback);

    getStatSummary(region, summoner_id, callback);

    getRankedStats(region, summoner_id, callback);

    getSummonerMasteries(region, summoner_id, callback);

    getSummonerRunes(region, summoner_id, callback);

    getSummonerByName(region, summoner_name, callback);

    getSummonerById(region, summoner_id, callback);

    getSummonerNameList(region, summoner_ids, callback);

    getTeams(region, summoner_id, callback);