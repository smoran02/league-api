var https = require('https');


function League(k) {
  this.key = k, 
  
  this.getChampions = function(region, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/champion?api_key='+this.key, function(res) {
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
  },

  this.getLeagues = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/'+region+'/v2.1/league/by-summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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
  },

  this.getGames = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/game/by-summoner/'+summoner_id+'/recent?api_key='+this.key, function(res) {
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
  },

  this.getStatSummary = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/stats/by-summoner/'+summoner_id+'/summary?api_key='+this.key, function(res) {
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
  },

  this.getRankedStats = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/stats/by-summoner/'+summoner_id+'/ranked?api_key='+this.key, function(res) {
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
  },

  this.getSummonerMasteries = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/summoner/'+summoner_id+'/masteries?api_key='+this.key, function(res) {
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
  },

  this.getSummonerRunes = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/summoner/'+summoner_id+'/runes?api_key='+this.key, function(res) {
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
  },

  this.getSummonerByName = function(region, summoner_name, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/summoner/by-name/'+summoner_name+'?api_key='+this.key, function(res) {
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
  },

  this.getSummonerById = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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
  },

  this.getSummonerNameList = function(region, summoner_ids, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.1/summoner/'+summoner_ids+'/name?api_key='+this.key, function(res) {
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
  },

  this.getTeams = function(region, summoner_id, cb) {
    var data = "";
    https.get('https://prod.api.pvp.net/api/'+region+'/v2.1/team/by-summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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
  }
}

module.exports = League;
