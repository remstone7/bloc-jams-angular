(function(){
    // inject service into ctrl
    function CollectionCtrl(Fixtures){
        this.albums = Fixtures.getCollection(12);
    }

    angular
        // add contorller to blocJams app
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures',  CollectionCtrl]);
})();