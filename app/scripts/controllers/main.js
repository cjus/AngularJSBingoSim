'use strict';

/**
 * @name MainCtrl
 * @description Main app controller. Drives BINGO simulation and app view.
 *  Utilizes BingoUtilsService.  This controller makes heavy use of the
 *  AngularJS scope object to keep the state of a simulation and the view in sync.
 * @author Carlos Justiniano
 */
angular.module('bingoftuiApp')
  .controller('MainCtrl', function($scope, BingoUtilsService) {
    var DELAY_BETWEEN_SIMULATION_RUNS = 1000;

    $scope.loop = true;
    $scope.speed = 'medium';
    $scope.runInProgress = false;
    $scope.columnLetters = BingoUtilsService.columnLetters;
    $scope.cols = BingoUtilsService.boardRange;
    $scope.rows = BingoUtilsService.boardRange;
    $scope.ballsCalled = [];
    $scope.buildBallArray = BingoUtilsService.buildBallArray();
    $scope.card = BingoUtilsService.blankCard();

    /**
     * @name getSpeedValue
     * @description returns a speed value which corresponds to a speed string
     * @param {string} speedText - 'slow', 'medium', 'fast'
     * @returns {number} speed value in milliseconds
     */
    function getSpeedValue(speedText) {
      var speed = 0;
      if (speedText == 'slow') {
        speed = 800;
      } else if (speedText == 'medium') {
        speed = 250;
      } else {
        speed = 16;
      }
      return speed;
    }

    /**
     * @name runSimulation
     * @description Runs one or more simulations.
     */
    $scope.runSimulation = function() {
      var timerID = null;
      var countDown = BingoUtilsService.MAX_BALLS;

      // begin by resetting the simulation
      resetSim();

      /**
       * @name resetSim
       * @description Resets the simulator. Simulator is driven by a setInterval timer.
       */
      function resetSim() {
        $scope.card = BingoUtilsService.blankCard();
        $scope.tiles = BingoUtilsService.blankTiles();
        $scope.ballsCalled = [];
        BingoUtilsService.fillCard($scope.card);
        countDown = BingoUtilsService.MAX_BALLS;
        timerID = setInterval(executePass, getSpeedValue($scope.speed));
      }

      /**
       * @name executePass
       * @description Executes a simulator pass. In BINGO this is a single call of a ball.
       *  executePass is essentially a single pass of a game loop.
       */
      function executePass() {
        $scope.runInProgress = true;

        if (--countDown < 0) {
          clearInterval(timerID);
          $scope.runInProgress = false;
          if ($scope.loop) {
            setTimeout(function() {
              resetSim();
            }, DELAY_BETWEEN_SIMULATION_RUNS);
          }
        } else {
          var ball = $scope.buildBallArray[countDown];
          $scope.ballsCalled.push(ball);
          BingoUtilsService.checkPlay(ball, $scope.card, $scope.tiles);
          if (BingoUtilsService.checkForBingo($scope.tiles) == true) {
            clearInterval(timerID);
            $scope.runInProgress = false;
            if ($scope.loop) {
              setTimeout(function() {
                resetSim();
              }, DELAY_BETWEEN_SIMULATION_RUNS);
            }
          }
        }
        $scope.$apply();
      }

    };
  });

