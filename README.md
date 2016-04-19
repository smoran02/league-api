League-api
=========

This module has ALL the functionality of RIOT's API, in a clear and easy to use format! League-api is a Node.js wrapper for the official RIOT games League of Legends API. Pull requests and feedback are welcome!

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

    league.getRecentGames('na', '5908', function(data) {
        console.log(data);
    });

All the functionality of the RIOT League of Legends API is included, and the code is clear to read and modify if you want to add functionality on top of what RIOT offers.
