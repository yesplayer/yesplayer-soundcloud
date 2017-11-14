const soundcloudDl = require("./index.js");

soundcloudDl.getSongDlById(141026561).then(function(song){
	console.log(song);
});

soundcloudDl.getSongDlByURL("https://m.soundcloud.com/mostafa-p-samir/mgk-swing-life-away").then(function(song){
	console.log(song)
});

