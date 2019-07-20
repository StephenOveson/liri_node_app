require("dotenv").config();
let keys = require('./keys.js');
let axios = require('axios');
let moment = require('moment');
let fs = require('fs')
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let nodeCommand = process.argv[2]
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
switch (nodeCommand) {
    case 'concert':
    case 'concerts':
    case `concert-this`:
        if (!input) {
            input = 'honne'
        }
        queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
        axios.get(queryUrl).then(function (data) {
            for (let i = 0; i < data.data.length; i++) {
                console.log(data.data[i].venue.name + ' ' + data.data[i].venue.city + ', ' + data.data[i].venue.country + ' ' + moment(data.data[i].datetime).format('MMMM Do YYYY, h:mm a'))
            }
        })
        break;
    case 'spotify':
    case 'spotify-this-song':
        if (!input) {
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
    case 'movie':
    case 'movies':
    case 'movie-this':
        if (!input) {
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
    case 'do-what-it-says':
        fs.readFile('random.txt', 'utf-8', function (err, data) {
            if (err) return console.log(err)
            if (data.includes('spotify-this-song')) {
                input = data.slice(20, data.length);
                spotify.search({ type: 'track', query: input }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
                    console.log('Song: ' + data.tracks.items[0].name)
                    console.log('Album: ' + data.tracks.items[0].album.name)
                    console.log('Preview Url: ' + data.tracks.items[0].external_urls.spotify)
                })
            } else if (data.includes('movie-this')) {
                input = data.slice(12, data.length-1)
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
            } else if (data.includes('concert-this')) {
                input = data.slice(14, data.length-1)
                console.log(input)
                queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
                axios.get(queryUrl).then(function (data) {
                    for (let i = 0; i < data.data.length; i++) {
                        console.log(data.data[i].venue.name + ' ' + data.data[i].venue.city + ', ' + data.data[i].venue.country + ' ' + moment(data.data[i].datetime).format('MMMM Do YYYY, h:mm a'))
                    }
                })
            } else {
                return console.log('The document does not contain any commands')
            }
        })
}
fs.appendFile('log.txt', '\n' + nodeCommand + ' ' + input, function(err){
    if (err) return console.log(err)
})