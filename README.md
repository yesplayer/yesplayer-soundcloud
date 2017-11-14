# soundcloud-dl

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [Example](#example)

<!-- vim-markdown-toc -->

## Installation

```bash
npm install soundcloud-dl --save
```

## Example

```javascript
const soundcloudDl = require("./index.js");

soundcloudDl.getSongDlById(141026561).then(function(song){
	console.log(song);
});

soundcloudDl.getSongDlByURL("https://m.soundcloud.com/mostafa-p-samir/mgk-swing-life-away").then(function(song){
	console.log(song)
});

soundcloudDl.search("swing").then(function(results){
	console.log(results);
});

```

