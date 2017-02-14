(function(){
    function SongPLayer() {
        var SongPlayer = {};
        
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new      audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song){
            //stop current playing song if there is one
            if(currentBuzzObject){
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
//            set new buzz obj
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        //play function
        SongPlayer.play = function(song){
            // if song is not current song
            if(currentSong !== song){
                //set the song
                setSong(song);
                //play song
                currentBuzzObject.play();
                song.playing = true;
                
            //if song is already current song, it must be paused    
            }else if(currentSong === song){
                //check to see if paused
                if(currentBuzzObject.isPaused()){
                    //play the song
                    currentBuzzObject.play();
                }
            }
            
        };
        //pause function
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        return SongPlayer;
    }
    
    
    angular 
    //tie to bloc jams
        .module('blocJams')
//    factory recipe
        .factory('SongPlayer', SongPLayer);
})();