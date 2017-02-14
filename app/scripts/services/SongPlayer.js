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
        
        /**
        *@function playSong
        *@desc plays current buzz object and set the playing property of the song to true
        *@param object
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing =true;
        };
        /**
        *@function pauseSong
        *@desc pausess current buzz object and set the pause property of the song to false
        *@param object
        */
        
        
        //play function
        SongPlayer.play = function(song){
            // if song is not current song
            if(currentSong !== song){
                //set the song
                setSong(song);
                //play song
                playSong(song);
                
            //if song is already current song, it must be paused    
            }else if(currentSong === song){
                //check to see if paused
                if(currentBuzzObject.isPaused()){
                    //play the song
                    playSong();
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