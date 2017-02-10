(function(){
    // inject the Fixtures service
    function AlbumCtrl(Fixtures){
        // use fixtures method
        this.albumData = Fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
        // add dependency injection (make usable by controller)
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
