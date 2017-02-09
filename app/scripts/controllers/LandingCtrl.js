(function(){
    function LandingCtrl(){
//        add heroTitle as a property to LandingCtrl
        this.heroTitle = "Turn the Music Up";
    }
    
    angular
        //retrieve already defined module (from app.js)
        .module('blocJams')
        // two params, a name, and a place for injections - executes when initialized
        .controller('LandingCtrl', LandingCtrl);
})();