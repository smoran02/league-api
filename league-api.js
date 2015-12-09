var https = require('https');

function League(k) {
  this.key = k;
}
  
League.prototype.getChampions = function(region, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.2/champion?api_key='+this.key, function(res) {
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

League.prototype.getLeagues = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/'+region+'/v2.5/league/by-summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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

League.prototype.getGames = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.3/game/by-summoner/'+summoner_id+'/recent?api_key='+this.key, function(res) {
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

League.prototype.getStatSummary = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.3/stats/by-summoner/'+summoner_id+'/summary?api_key='+this.key, function(res) {
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

League.prototype.getRankedStats = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.3/stats/by-summoner/'+summoner_id+'/ranked?api_key='+this.key, function(res) {
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

League.prototype.getSummonerMasteries = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.4/summoner/'+summoner_id+'/masteries?api_key='+this.key, function(res) {
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

League.prototype.getSummonerRunes = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.4/summoner/'+summoner_id+'/runes?api_key='+this.key, function(res) {
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

League.prototype.getSummonerByName = function(region, summoner_name, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+summoner_name+'?api_key='+this.key, function(res) {
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

League.prototype.getSummonerById = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.4/summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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

League.prototype.getSummonerNameList = function(region, summoner_ids, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/lol/'+region+'/v1.4/summoner/'+summoner_ids+'/name?api_key='+this.key, function(res) {
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

League.prototype.getTeams = function(region, summoner_id, cb) {
	var data = "";
	https.get('https://prod.api.pvp.net/api/'+region+'/v2.4/team/by-summoner/'+summoner_id+'?api_key='+this.key, function(res) {
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

module.exports = League;

