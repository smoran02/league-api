var https = require('https');
var http = require('http');

function League(k) {
  this.key = k;

  this.makeCall = function(urlString, cb) {
  	var data = "";
  	console.log(urlString);
	https.get(urlString, function(res) {
		res.on('data', function(chunk){
			data += chunk.toString();
		});
		res.on('end', function(){
			try {
				cb(null, JSON.parse(data));
			} catch (err) {
				cb(err);
			}
		});
	});
  };

  this.makeHTTPCall = function(urlString, cb) {
  	var data = "";
  	console.log(urlString);
	http.get(urlString, function(res) {
		res.on('data', function(chunk){
			data += chunk.toString();
		});
		res.on('end', function(){
			try {
				cb(null, JSON.parse(data));
			} catch (err) {
				cb(err);
			}
		});
	});
  };

  this.makeStaticCallWithQueryParams = function(region, listData, listType, endpoint, cb) {
  	var urlString = '';
  	if (listData) {
  		urlString = this.getStaticUrl(region)+'/'+endpoint+'?'+listType+'='+listData+'&api_key='+this.key;
  	} else {
  		urlString = this.getStaticUrl(region)+'/'+endpoint+'?api_key='+this.key;
  	}
  	this.makeCall(urlString, cb);
  };

  this.makeStaticIdCallWithQueryParams = function(region, listData, listType, endpoint, data_id, cb) {
  	var urlString = '';
  	if (listData) {
  		urlString = this.getStaticUrl(region)+'/'+endpoint+'/'+data_id+'?'+listType+'='+listData+'&api_key='+this.key;
  	} else {
  		urlString = this.getStaticUrl(region)+'/'+endpoint+'/'+data_id+'?api_key='+this.key;
  	}
  	this.makeCall(urlString, cb);
  };

  this.getRootUrl = function(region) {
  	return 'https://'+region+'.api.pvp.net/api/lol/'+region;
  };

  this.getStaticUrl = function(region) {
  	return 'https://global.api.pvp.net/api/lol/static-data/'+region+'/v1.2';
  };

  this.serialize = function(options) {
  	return '?' + 
  		Object.keys(options).map(function(key) {
  			return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
  		}).join('&');
  };

  this.getOptionsAsString = function(options) {
  	if(options) {
  		return this.serialize(options) + '&api_key=' + this.key;
  	} else {
  		return '?api_key=' + this.key;
  	}
  }

  this.getPlatform = function(region) {
  	switch(region.toLowerCase()) {
  		case 'br':
  			return 'BR1';
  		case 'eune':
  			return 'EUN1';
  		case 'euw':
  			return 'EUW1';
  		case 'kr':
  			return 'KR';
  		case 'lan':
  			return 'LA1';
  		case 'las':
  			return 'LA2';
  		case 'na':
  		    return 'NA1';
  		case 'oce':
  			return 'OC1';
  		case 'tr':
  			return 'TR1';
  		case 'ru':
  			return 'RU';
  		case 'pbe':
  			return 'PBE';
  		default:
  			return 'no region';
  	}
  };
}

// champion-v1.2

// Retrieve all Champions
League.prototype.getChampions = function(region, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.2/champion?api_key='+this.key, cb);
};

// Retrieves all free to play Champions
League.prototype.getF2PChampions = function(region, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.2/champion?freeToPlay=true&api_key='+this.key, cb);
};

// Retrieve champion by ID
League.prototype.getChampionById = function(region, champion_id, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.2/champion/'+champion_id+'?api_key='+this.key, cb);
};


// championmastery

// Get a champion mastery by player id and champion id 
// Response code 204 means there were no masteries found for given player id or player id and champion id combination
League.prototype.getChampionMastery = function(region, player_id, champion_id, cb) {
	this.makeCall('https://'+region+'.api.pvp.net/championmastery/location/'+this.getPlatform(region)+'/player/'+player_id+
		'/champion/'+champion_id+'?api_key='+this.key, cb);
};

// Get all champion mastery entries sorted by number of champion points descending
League.prototype.getAllChampionMasteries = function(region, player_id, cb) {
	this.makeCall('https://'+region+'.api.pvp.net/championmastery/location/'+this.getPlatform(region)+'/player/'+player_id+
		'/champions/?api_key='+this.key, cb);
};

// Get a player's total champion mastery score, which is sum of individual champion mastery levels
League.prototype.getTotalMasteryScore = function(region, player_id, cb) {
	this.makeCall('https://'+region+'.api.pvp.net/championmastery/location/'+this.getPlatform(region)+'/player/'+player_id+
		'/score/?api_key='+this.key, cb);
};

// Get specified number of top champion mastery entries sorted by number of champion points descending
League.prototype.getTopChampionMasteries = function(region, player_id, count, cb) {
	this.makeCall('https://'+region+'.api.pvp.net/championmastery/location/'+this.getPlatform(region)+'/player/'+player_id+
		'/topchampions/?count='+count+'&api_key='+this.key, cb);
};


// current-game-v1.0

// Get current game information for the given summoner ID
League.prototype.getCurrentGameInfo = function(region, player_id, cb) {
	this.makeCall('https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/'+this.getPlatform(region)+'/'+player_id+
		'?api_key='+this.key, cb);
};


// featured-games-v1.0

// Get list of featured games
League.prototype.getFeaturedGamesList = function(region, cb) {
	this.makeCall('https://'+region+'.api.pvp.net/observer-mode/rest/featured?api_key='+this.key, cb);
};


// game-v1.3

// Get recent games by summoner ID
League.prototype.getRecentGames = function(region, summoner_id, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.3/game/by-summoner/'+summoner_id+'/recent?api_key='+this.key, cb);
};


// league-v2.5

// Get leagues mapped by summoner ID for a given list of summoner IDs
League.prototype.getLeaguesBySummonerId = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/by-summoner/'+summoner_ids+'?api_key='+this.key, cb);
};

// Get league entries mapped by summoner ID for a given list of summoner IDs
League.prototype.getLeagueEntriesBySummonerId = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/by-summoner/'+summoner_ids+'/entry?api_key='+this.key, cb);
};

// Get leagues mapped by team ID for a given list of team IDs
League.prototype.getLeaguesByTeamId = function(region, team_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/by-team/'+team_ids+'?api_key='+this.key, cb);
};

// Get league entries mapped by team ID for a given list of team IDs
League.prototype.getLeagueEntriesByTeamId = function(region, team_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/by-team/'+team_ids+'/entry?api_key='+this.key, cb);
};

// Get challenger tier leagues
League.prototype.getChallengerTierLeagues = function(region, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key='+this.key, cb);
};

// Get master tier leagues
League.prototype.getMasterTierLeagues = function(region, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.5/league/master?type=RANKED_SOLO_5x5&api_key='+this.key, cb);
};


// lol-static-data-v1.2

// Retrieves champion list
// champData is a comma delimited string of options ie skins,spells
League.prototype.getChampionDataList = function(region, champData, cb) {
	this.makeStaticCallWithQueryParams(region, champData, 'champData', 'champion', cb);
};

// Retrieves a champion by its id
// champData is a comma delimited string of options ie skins,spells
League.prototype.getChampionDataById = function(region, champion_id, champData, cb) {
	this.makeStaticIdCallWithQueryParams(region, champData, 'champData', 'champion', champion_id, cb);
};

// Retrieves item list
// itemListData is a comma delimited string of options ie gold,sanitizedDescription
League.prototype.getItemDataList = function(region, itemListData, cb) {
	this.makeStaticCallWithQueryParams(region, itemListData, 'itemListData', 'item', cb);
};

// Retrieves item by its unique id
// itemListData is a comma delimited string of options ie gold,sanitizedDescription
League.prototype.getItemDataById = function(region, item_id, itemListData, cb) {
	this.makeStaticIdCallWithQueryParams(region, itemListData, 'itemListData', 'item', item_id, cb);
};

// Retrieve language strings data
League.prototype.getLanguageStringsData = function(region, cb) {
	this.makeCall(this.getStaticUrl(region)+'/language-strings?api_key='+this.key, cb);
};

// Retrieve supported languages data
League.prototype.getSupportedLanguagesData = function(region, cb) {
	this.makeCall(this.getStaticUrl(region)+'/languages?api_key='+this.key, cb);
};

// Retrieve map data
League.prototype.getMapData = function(region, cb) {
	this.makeCall(this.getStaticUrl(region)+'/map?api_key='+this.key, cb);
};

// Retrieves mastery list
// masteryListData is a comma delimited string ie ranks,masteryTree
League.prototype.getMasteryList = function(region, masteryListData, cb) {
	this.makeStaticCallWithQueryParams(region, masteryListData, 'masteryListData', 'mastery', cb);
};

// Retrieves mastery item by its unique id
// masteryListData is a comma delimited string ie ranks,masteryTree
League.prototype.getMasteryListById = function(region, mastery_id, masteryData, cb) {
	this.makeStaticIdCallWithQueryParams(region, masteryData, 'masteryData', 'mastery', mastery_id, cb);
};

// Retrieve realm data
League.prototype.getRealmData = function(region, cb) {
	this.makeCall(this.getStaticUrl(region)+'/realm?api_key='+this.key, cb);
};

// Retrieves rune list
// runeListData is a comma delimited string ie gold,stacks
League.prototype.getRuneList = function(region, runeListData, cb) {
	this.makeStaticCallWithQueryParams(region, runeListData, 'runeListData', 'rune', cb);
};

// Retrieves rune by its unique id
// runeListData is a comma delimited string ie gold,stacks
League.prototype.getRuneDataById = function(region, rune_id, runeListData, cb) {
	this.makeStaticIdCallWithQueryParams(region, runeListData, 'runeListData', 'rune', rune_id, cb);
};

// Retrieves summoner spell list
// spellData is a comma delimited string ie cooldown,range
League.prototype.getSummonerSpellList = function(region, spellData, cb) {
	this.makeStaticCallWithQueryParams(region, spellData, 'spellData', 'summoner-spell', cb);
};

// Retrieves summoner spell by its unique id
// spellData is a comma delimited string ie cooldown,range
League.prototype.getSummonerSpellDataById = function(region, spell_id, spellData, cb) {
	this.makeStaticIdCallWithQueryParams(region, spellData, 'spellData', 'summoner-spell', spell_id, cb);
};

// Retrieve version data
League.prototype.getVersionData = function(region, cb) {
	this.makeHTTPCall(this.getStaticUrl(region)+'/versions?api_key='+this.key, cb);
}


// lol-status-v1.0

// Get shard list
League.prototype.getShardList = function(cb) {
	this.makeHTTPCall('http://status.leagueoflegends.com/shards', cb);
};

// Get shard status
// Returns the data available on the status.leagueoflegends.com website for the given region
League.prototype.getShardByRegion = function(region, cb) {
	this.makeHTTPCall('http://status.leagueoflegends.com/shards/'+region, cb);
};


// match-v2.2

// Retrieve match by match ID
// include_timeline is a boolean
League.prototype.getMatchById = function(region, match_id, include_timeline, cb) {
	var urlString = '';
	if (include_timeline) {
		urlString = this.getRootUrl(region)+'/v2.2/match/'+match_id+'?includeTimeline='+include_timeline+'&api_key='+this.key;
	} else {
		urlString = this.getRootUrl(region)+'/v2.2/match/'+match_id+'?api_key='+this.key;
	}
	this.makeCall(urlString, cb);
};


// matchlist-v2..2

// Retrieve match list by summoner id
// options is a hash of permitted query parameters
League.prototype.getMatchListById = function(region, summoner_id, options, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.2/matchlist/by-summoner/'+summoner_id+this.getOptionsAsString(options), cb);
};


// stats-v1.3

// Get ranked stats by summoner id
League.prototype.getRankedStatsById = function(region, summoner_id, options, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.3/stats/by-summoner/'+summoner_id+'/ranked'+this.getOptionsAsString(options), cb);
};

// Get player stats summaries by summoner id
League.prototype.getStatSummaryById = function(region, summoner_id, options, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.3/stats/by-summoner/'+summoner_id+'/summary'+this.getOptionsAsString(options), cb);
};


// summoner-v1.4

// Get summoner objects mapped by standardized summoner name for a given list of summoner names
League.prototype.getSummonersByName = function(region, summoner_names, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.4/summoner/by-name/'+summoner_names+'?api_key='+this.key, cb);
};

// Get summoner objects mapped by summoner ID for a given list of summoner IDs
League.prototype.getSummonersById = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.4/summoner/'+summoner_ids+'?api_key='+this.key, cb);
};

// Get mastery pages mapped by summoner ID for a given list of summoner IDs
League.prototype.getMasteryPagesById = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.4/summoner/'+summoner_ids+'/masteries/?api_key='+this.key, cb);
};

// Get summoner names mapped by summoner ID for a given list of summoner IDs
League.prototype.getSummonerNamesById = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.4/summoner/'+summoner_ids+'/name/?api_key='+this.key, cb);
};

// Get rune pages mapped by summoner ID for a given list of summoner IDs
League.prototype.getRunePagesById = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v1.4/summoner/'+summoner_ids+'/runes/?api_key='+this.key, cb);
};


// team-v2.4

// Get teams mapped by summoner ID for a given list of summoner IDs
League.prototype.getTeamsBySummonerIds = function(region, summoner_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.4/team/by-summoner/'+summoner_ids+'?api_key='+this.key, cb);
};

// Get teams mapped by team ID for a given list of team IDs
League.prototype.getTeamsByTeamIds = function(region, team_ids, cb) {
	this.makeCall(this.getRootUrl(region)+'/v2.4/team/'+team_ids+'?api_key='+this.key, cb);
};


module.exports = League;
