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
    $scope.linkText = 'View Selected Team Players';
    $scope.showPlayerButton = true;
    $scope.players = true;
    $scope.containers = true;
    $scope.batorbowl = false;

    /**
     * function to fetch the records from the database
     */
    $http.get('database.json')
            .then(function ($response) {
                $scope.teamsLst = $response.data;
                $scope.countr = 0;
                $scope.allTeams = $scope.teamsLst.Teams; // creating scope for teams
            });

    $scope.setTeam1 = function (_this) {
        $scope.teamPlayers = $scope.allTeams;
        angular.forEach($scope.allTeams, function (_value, _index) {
            if (angular.equals(_value.ID, _this)) {
                $scope.teamName1 = _value.Name
                $scope.teamPlayers1 = _value.Players;
            }
        });
    }


    $scope.setTeam2 = function (_this) {
        $scope.teamPlayers = $scope.allTeams;
        angular.forEach($scope.allTeams, function (_value, _index) {
            if (angular.equals(_value.ID, _this)) {
                $scope.teamName2 = _value.Name
                $scope.teamPlayers2 = _value.Players;
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
            $scope.linkText = 'Next for Toss';
            $scope.msg = '';
            $scope.showPlayerButton = false;
            $scope.showTossButton = true;
            $scope.onClick = 'showToss()';
        } else {
            console.log(21)
            $scope.msg = 'Please select both the teams first';
        }
    }

    $scope.showToss = function () {
        $scope.showTossButton = false;
        $scope.players = false;
        $scope.toss = true
    }

    $scope.spinToss = function (_toss) {

        $scope.toss = false;
        $scope.x = Math.floor((Math.random() * 2) + 1);
        if (_toss === $scope.x) {
            $scope.wonLost = true;
            $scope.tossResult = $scope.teamName1 + " has won the toss ";
        } else {
            $scope.wonLost = false;
            $scope.tossResult = $scope.teamName2 + " has won the toss ";
        }
        $scope.batorbowl = true;
    }


    $scope.chooseTo = function () {


        if (isNaN($scope.chances)) {
            $scope.playingOrder = 'Please select bat or ball';
        } else {
            $scope.batorbowl = false;
            $scope.result = true;
            if ($scope.wonLost == true) {
                $scope.playingOrder = $scope.teamName1 + ' has choosed to ' + (($scope.chances === 1) ? 'Bat' : 'Ball');
            } else {
                $scope.playingOrder = $scope.teamName2 + ' has choosed to ' + (($scope.chances === 1) ? 'Bat' : 'Ball');
            }

        }


    }

});



