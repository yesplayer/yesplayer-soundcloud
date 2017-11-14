# soundcloud-dl

## Example

```javascript
const soundcloudDl = require("./index.js");

soundcloudDl.getSongDlById(141026561).then(function(clientId){
	console.log(clientId);
});

soundcloudDl.getSongDlByURL("https://m.soundcloud.com/mostafa-p-samir/mgk-swing-life-away").then(function(song){
	console.log(song)
});
```

