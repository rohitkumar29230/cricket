/**
 * Main AngularJS Web Application
 */
var app = angular.module('cricketApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/landing.html", controller: "PageCtrl"})
    // Teams Page
    .when("/select-team", {templateUrl: "templates/teamlist.html", controller: "teamList"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


app.controller('teamList', function($scope, $http){
    
        $http.get('database.json')
            .then(function($response){
               var _teamArry = [];
               $scope.teamsLst =  $response.data;
               $scope.countr= 0;
               angular.forEach($scope.teamsLst.Teams, function(_value, _index){
                   _teamArry.push(_value.Name);
               });
               $scope.names = _teamArry;
               $scope.my = { favorite: '----------' };

            });
            
            $scope.PlayersList =  function(){
                $scope.msg = 'gone'
            }
            
});




/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {

 $scope.my = 1;

});