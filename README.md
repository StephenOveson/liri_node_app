# liri_node_app

# Welcome To LIRI

### What and Why
        This application is meant to provide information through the command line for concerts, music, and movies.
        The main reason for this was to be able to reach information quicker and through a more available handier mean.
        Similar to the idea of SIRI, but through nodeJS.

### Overview of application
        This application uses NodeJS and npm's node modules to run multiple different processes based on what is asked of LIRI.
        It uses a node-spotify-api package found at (https://www.npmjs.com/package/node-spotify-api) to intake songs commands and spit out information about the song.
        It uses an api called [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api to intake a band and put out information about upcoming concerts.
        It also uses moment.js along side the bands in town api to configure the dates correctly and legibly.
        I am also using OMDB's API [OMDB API](http://www.omdbapi.com)
        Both the bands in town API and omdb API is being run using the axios package
        It then uses 'fs' to append to a log file any commands fed to it

### How to Use
        Instructions to run the application:
        You will need your own spotify developer account with both the "secret id" and "client id".
        Then you can create a ".env" file with:
        ```
        # Spotify API keys
        SPOTIFY_ID="your-spotify-id"
        SPOTIFY_SECRET="your-spotify-secret"
        ```

        Place this ".env" file into the same directory as the liri.js.
        You will need to install the modules by running "npm install".
        You will now have everything you need to run the application.

        Open up command line and using "node" run the file and add commands such as
        spotify-this-song "song name"
        movie-this "movie title"
        concert-this "band name"

        spotify-this-song "song name" returns data relative to the song inserted including; Artist, Album, and Song Name.
        concert-this "band name" returns concert venues, contries, cities, and dates that it's all occuring on
        movie-this "movie name" returns Movie title, ratings, year it came out, plot, and actors
        do-what-it-says will run a command based on what's in the "random.txt file" you can change the file, but the general layout needs to stay the same for example:

        ```
        movie-this,"tron"
        concert-this,"honne"
        spotify-this-song,"all you need is love"
        ```


### Screenshots
        ![spotify-this-song screenshot](/assets/screenshots/spotify-this-song.png)

### Link to depolyed version


### Technologies Used


### My role
