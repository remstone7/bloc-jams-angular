(function(){
    // inject the Fixtures service
    function AlbumCtrl(Fixtures, SongPlayer){
        // use fixtures method
        this.albumData = Fixtures.getAlbum();
        //use SongPLayer method
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        // add dependency injection (make usable by controller)
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
