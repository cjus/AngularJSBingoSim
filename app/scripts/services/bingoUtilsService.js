/**
 * @name BingoUtilsService
 * @description Service which encapsulates BINGO related functionality.
 *  This service is used by the MainCtrl controller and depends on the
 *  ArrayUtilsService.
 * @author Carlos Justiniano
 */
angular.module('bingoftuiApp')
  .service('BingoUtilsService', function BingoUtilsService(ArrayUtilsService) {
    'use strict';
    var boardRange = [0, 1, 2, 3, 4],
      columnOffsets = [1, 16, 31, 46, 61], // column offset
      columnLetters = ['B', 'I', 'N', 'G', 'O'],
      TILE_PROP_SELECTED = 'selected',
      TILE_PROP_BINGO = 'bingo',
      MAX_BALLS = 75;

    this.boardRange = boardRange;
    this.columnLetters = columnLetters;
    this.MAX_BALLS = MAX_BALLS;

    /**
     * @name blankCard
     * @description creates a blank bingo card array
     * @returns {Array}
     */
    this.blankCard = function () {
      return [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
    };

    /**
     * @name blankTiles
     * @description Bingo card property tiles. Each tile can contain a value of
     *  ''=empty, 'selected'=number on this tile was called, 'bingo'=tile is
     *  part of bingo app data binds to a tile array in order to alter CSS
     *  properties for display.
     * @returns {Array}
     */
    this.blankTiles = function () {
      return [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ];
    };

    /**
     * @name buildBallArray
     * @description builds a shuffled array of bingo balls
     * @returns {Array} shuffled bingo array
     */
    this.buildBallArray = function () {
      var c, r, ballArray = [];
      for (c = 0; c < 5; c++) {
        for (r = 0; r < 15; r++) {
          ballArray.push(columnLetters[c] + (r + columnOffsets[c]));
        }
      }
      ballArray = ArrayUtilsService.shuffle(ballArray);
      return ballArray;
    };

    /**
     * @name fillCard
     * @param card {Array}
     * @description populates the scope's bingo card with random values
     * per bingo rules
     */
    this.fillCard = function (card) {
      var num,
        r, // row
        c, // column
        numsInCards = [0]; // numbers chosen and placed on cards
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          do {
            num = Math.floor(Math.random() * 15) + columnOffsets[c];
          } while (ArrayUtilsService.inArray(numsInCards, num) !== -1);
          numsInCards.push(num);
          card[r][c] = num;
        }
      }
    };

    /**
     * @name checkPlay
     * @description checks a bingo card for matches, updates card tiles
     * @param ball {String}
     * @param card {Array}
     * @param tiles {Array}
     */
    this.checkPlay = function (ball, card, tiles) {
      var r, letterIndex = columnLetters.indexOf(ball[0]),
        num = Number(ball.slice(1));
      for (r = 0; r < 5; r++) {
        if (card[r][letterIndex] === num) {
          tiles[r][letterIndex] = TILE_PROP_SELECTED;
        }
      }
    };

    /**
     * @name checkForBingo
     * @description Checks card tiles for BINGO!
     * @param tiles
     * @returns {boolean} if BINGO is found
     */
    this.checkForBingo = function (tiles) {
      var bingoFound = false;
      if (checkForBingoOnRows(tiles)) {
        bingoFound = true;
      } else if (checkForBingoOnColumns(tiles)) {
        bingoFound = true;
      } else if (checkForBingoOnDiagonals(tiles)) {
        bingoFound = true;
      }
      return bingoFound;
    };

    function checkForBingoOnRows(tiles) {
      var r, c,
        hitCount = 0,
        bingoFound = false;

      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          if (tiles[r][c] === TILE_PROP_SELECTED) {
            hitCount++;
          }
        }
        if (hitCount === 5) {
          for (c = 0; c < 5; c++) {
            tiles[r][c] = TILE_PROP_BINGO;
          }
          bingoFound = true;
        } else {
          hitCount = 0;
        }
      }
      return bingoFound;
    }

    function checkForBingoOnColumns(tiles) {
      var r, c,
        hitCount = 0,
        bingoFound = false;

      for (c = 0; c < 5; c++) {
        for (r = 0; r < 5; r++) {
          if (tiles[r][c] === TILE_PROP_SELECTED) {
            hitCount++;
          }
        }
        if (hitCount === 5) {
          for (r = 0; r < 5; r++) {
            tiles[r][c] = TILE_PROP_BINGO;
          }
          bingoFound = true;
        } else {
          hitCount = 0;
        }
      }
      return bingoFound;
    }

    function checkForBingoOnDiagonals(tiles) {
      var bingoFound = false;
      if (tiles[0][0] === TILE_PROP_SELECTED &&
          tiles[1][1] === TILE_PROP_SELECTED &&
          tiles[2][2] === TILE_PROP_SELECTED &&
          tiles[3][3] === TILE_PROP_SELECTED &&
          tiles[4][4] === TILE_PROP_SELECTED) {
        tiles[0][0] = TILE_PROP_BINGO;
        tiles[1][1] = TILE_PROP_BINGO;
        tiles[2][2] = TILE_PROP_BINGO;
        tiles[3][3] = TILE_PROP_BINGO;
        tiles[4][4] = TILE_PROP_BINGO;
        bingoFound = true;
      } else if (tiles[0][4] === TILE_PROP_SELECTED &&
          tiles[1][3] === TILE_PROP_SELECTED &&
          tiles[2][2] === TILE_PROP_SELECTED &&
          tiles[3][1] === TILE_PROP_SELECTED &&
          tiles[4][0] === TILE_PROP_SELECTED) {
        tiles[0][4] = TILE_PROP_BINGO;
        tiles[1][3] = TILE_PROP_BINGO;
        tiles[2][2] = TILE_PROP_BINGO;
        tiles[3][1] = TILE_PROP_BINGO;
        tiles[4][0] = TILE_PROP_BINGO;
        bingoFound = true;
      }
      return bingoFound;
    }

  });
