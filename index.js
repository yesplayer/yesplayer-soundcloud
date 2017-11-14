const request = require("request");

const soundcloudDl = {
	_latestAppBundle: undefined,
	_clientId: undefined,

	getLatestAppBundle: function(){
		return new Promise(function(resolve, reject){
			request('https://soundcloud.com/', function (error, response, body) {
				let spliter = "assets/app-";
				let appUrl = body.split(spliter);

				appUrl[0] = appUrl[1].split("\"");
				appUrl[0] = appUrl[0][appUrl[0].length - 1];

				appUrl[1] = appUrl[2].split("\"")[0];

				appUrl = appUrl[0] + spliter + appUrl[1];

				soundcloudDl._latestAppBundle = appUrl;
				resolve(appUrl);
			});
		});
	},

	_getClientId: function(){
		return new Promise(function(resolve, reject){
			request(soundcloudDl._latestAppBundle, function (error, response, body) {
				let clientId = body.split("client_id")[1].split("\"")[1];

				soundcloudDl._clientId = clientId;

				resolve(clientId);
			});
		});
	},
	getClientId: function(){
		return new Promise(function(resolve, reject){
			if(soundcloudDl._latestAppBundle){
				soundcloudDl._getClientId().then(function(clientId){
					resolve(clientId);
				});
			} else {
				soundcloudDl.getLatestAppBundle().then(function(){
					soundcloudDl._getClientId().then(function(clientId){
						resolve(clientId);
					});
				});
			}
		});
	},

	_getSongDlById: function(id){
		return new Promise(function(resolve, reject){
			request("https://api.soundcloud.com/i1/tracks/"+id+"/streams?client_id="+soundcloudDl._clientId, function (error, response, body) {
				resolve(JSON.parse(body));
			});
		});
	},
	getSongDlById: function(id){
		return new Promise(function(resolve, reject){
			if(soundcloudDl._clientId){
				soundcloudDl._getSongDlById(id).then(function(song){
					resolve(song);
				});
			} else {
				soundcloudDl.getClientId().then(function(){
					soundcloudDl._getSongDlById(id).then(function(song){
						resolve(song);
					});
				});
			}
		});
	},

	getSongDlByURL: function(url){
		return new Promise(function(resolve, reject){
			var options = {
				url: url,
				headers: {
					'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
				}
			};

			request(options, function (error, response, body) {
				let id = body.split("soundcloud://sounds:")[1].split("\"")[0];

				soundcloudDl.getSongDlById(id).then(function(song){
					resolve(song);
				});
			});
		});
	},

	_search(query){
		return new Promise(function(resolve, reject){
			request("https://api-v2.soundcloud.com/search?q="+query+"&limit=200&client_id="+soundcloudDl._clientId, function (error, response, body) {
				resolve(JSON.parse(body));
			});
		});
	},
	search: function(query){
		return new Promise(function(resolve, reject){
			if(soundcloudDl._clientId){
				soundcloudDl._search(query).then(function(results){
					resolve(results);
				});
			} else {
				soundcloudDl.getClientId().then(function(){
					soundcloudDl._search(query).then(function(results){
						resolve(results);
					});
				});
			}
		});
	}
};

module.exports = soundcloudDl;

