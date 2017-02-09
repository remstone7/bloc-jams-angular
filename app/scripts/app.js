(function() {
    //configure paths
     function config($stateProvider, $locationProvider) {
         
         // Configure the app's path
         $locationProvider
            .html5Mode({
                // Disables #! routes
                enabled: true,
                // helps avoids $location error
                requireBase: false
         });
         
         // Setup the template routes
         $stateProvider
         .state('landing', {
             url: '/',
             // alias the contorller name 
             controller: 'LandingCtrl as landing',
             templateUrl: '/templates/landing.html'
         })
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         })
         .state('collection',{
             url: '/collection',
             controller: 'CollectionCtrl as collection',
             templateUrl: '/templates/collection.html'
         });
     }
    
    // set up Module
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();