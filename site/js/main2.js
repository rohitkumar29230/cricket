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


app.controller('teamList', function ($scope, $http) {
    var _teamArry = []; // Teams Array
    var _counter = 0;
    this.teamA = ''
    this.teamb = ''
    var teamPlayers = ''


    /**
     * function to fetch the records from the database
     */
    $http.get('database.json')
            .then(function ($response) {
                $scope.teamsLst = $response.data;
                $scope.countr = 0;
                $scope.allTeams = $scope.teamsLst.Teams; // creating scope for teams
            });

    $scope.setTeam = function (_this) {
        $scope.teamPlayers = $scope.allTeams;
        angular.forEach($scope.allTeams, function (_value, _index) {
            
            if (angular.equals(_value.ID, _this)) {
                $scope.teamName =  _value.Name
                $scope.teamPlayers = _value.Players;
            }
        });

    }

    $scope.showTeams = function () {
        var _minTeamsPlayers = 22;
        var _teamLenth = $('.players ul li').length;
        
        if (_teamLenth > 21) {
            $('.teamList').addClass('ng-hide');
            $('.players').removeClass('ng-hide');
            $('.players').addClass('ng-show');
             
            $scope.msg = '';
        } else {
            console.log(21)
            $scope.msg = 'Please select both the teams first';
        }

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


