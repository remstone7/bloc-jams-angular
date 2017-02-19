(function(){
    // injext fixtures
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /**
        *@desc store album information (picasso)
        *@type object
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
         /**
        *@function playSong
        *@desc plays current buzz object and set the playing property of the song to true
        *@param object
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
        *@function stopSong
        *@desc stops current buzz object and set the playing property of the song to false
        *@param object
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;

        };
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new      audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song){
            //stop current playing song if there is one
            if(currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
//            set new buzz obj
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        /**
        *@func getSongIndex
        *@desc get the index of the song
        *param 
        */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        *@desc Active song object form list of songs
        *@type {object}
        */
        
        SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        *@function play
        *@desc play current or new song
        *@param {object}
        */
        SongPlayer.play = function(song){
            // assign value of song or vaue of current song to song
            song = song || SongPlayer.currentSong;            
            // if song is not current song
            if(SongPlayer.currentSong !== song){
                //set the song
                setSong(song);
                //play song
                playSong(song);
                
            //if song is already current song, it must be paused    
            }else if(SongPlayer.currentSong === song){
                //check to see if paused
                if(currentBuzzObject.isPaused()){
                    //play the song
                    playSong(song);
                }
            }
            
        };
        
        /**
        *@function pauseSong
        *@desc pausess current buzz object and set the pause property of the song to false
        *@param object
        */
        //pause function
        SongPlayer.pause = function(song) {
            // assign value of song or vaue of current song to song
            song = song || SongPlayer.currentSong;
            // pause current song
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        *@func previousSong
        *@desc go to the previous song of the current index
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            // if less than 0
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            // not less than 0    
            }else{
                // store the current song index
                var song = currentAlbum.songs[currentSongIndex];
                //play and set the song
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        *@func previousSong
        *@desc go to the previous song of the current index
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            var lastSongIndex = currentAlbum.songs.length - 1;
            // if less than 0
            if (currentSongIndex > lastSongIndex) {
                // stop the song
               stopSong(SongPlayer.currentSong);
            // not greater than last song   
            }else{
                // store the current song index
                var song = currentAlbum.songs[currentSongIndex];
                //play and set the song
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }
    
    
    angular 
    //tie to bloc jams
        .module('blocJams')
//    factory recipe and inject dependencies
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();