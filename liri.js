require("dotenv").config();
let keys = require('./keys.js');
let axios = require('axios');
let moment = require('moment')
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
nodeFunction = process.argv[2]

let input = ''
let nodeArgs = process.argv
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
    } else {
        input += nodeArgs[i];

    }
}
let queryUrl;
switch (nodeFunction) {
    case `concert-this`:
        queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
        axios.get(queryUrl).then(function (data) {
            for (let i = 0; i < data.data.length; i++) {
                console.log(data.data[i].venue.name + ' ' + data.data[i].venue.city + ', ' + data.data[i].venue.country + ' ' + moment(data.data[i].datetime).format('MMMM Do YYYY, h:mm a'))
            }
        })
        break;
    case 'spotify-this-song':
        if (input === '') {
            input = 'The Sign Ace of Base'
        }
        spotify.search({ type: 'track', query: input }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song: ' + data.tracks.items[0].name)
            console.log('Album: ' + data.tracks.items[0].album.name)
            console.log('Preview Url: ' + data.tracks.items[0].external_urls.spotify)
        });
        break;
    case 'movie-this':
        if (input === '') {
            input = 'Mr.Nobody'
        }
        queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(function (data) {
            if (data.data.Ratings[1] === undefined) {
                console.log('Title: ' + data.data.Title)
                console.log('Year: ' + data.data.Year)
                console.log('IMDB Rating: ' + data.data.imdbRating)
                console.log('Filmed in: ' + data.data.Country)
                console.log('Languages: ' + data.data.Language)
                console.log('Plot: ' + data.data.Plot)
                console.log('Actors: ' + data.data.Actors)
            } else {
                console.log('Title: ' + data.data.Title)
                console.log('Year: ' + data.data.Year)
                console.log('IMDB Rating: ' + data.data.imdbRating)
                console.log('Rotten Tomatoes Rating: ' + data.data.Ratings[1].Value)
                console.log('Filmed in: ' + data.data.Country)
                console.log('Languages: ' + data.data.Language)
                console.log('Plot: ' + data.data.Plot)
                console.log('Actors: ' + data.data.Actors)
            }
        })
        break;

}