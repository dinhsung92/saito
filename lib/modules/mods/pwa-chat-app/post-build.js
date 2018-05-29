var fs = require('fs');
var fileName = './build/asset-manifest.json';
var file = require(fileName);

var newObject = {};

Object.keys(file).forEach(function(key) {
    // console.log('Key : ' + key + ', Value : ' + data[key])
    newObject[key] = '/chat-app/' + file[key]
})

fs.writeFile(fileName, JSON.stringify(newObject), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});