'use strict';

describe('Service: BingoUtilsService', function () {

  // load the service's module
  beforeEach(module('bingoftuiApp'));

  // instantiate service
  var bingoUtilsService, arrayUtilsService;
  beforeEach(inject(function (BingoUtilsService, ArrayUtilsService) {
    bingoUtilsService = BingoUtilsService;
    arrayUtilsService = ArrayUtilsService;
  }));

  it('should do something', function () {
    expect(!!bingoUtilsService).toBe(true);
  });

  describe('Blank card', function () {
    it('should return a blank card', function () {
      expect(bingoUtilsService.blankCard).toBeTruthy();
    });

    it('should be of type Array', function () {
      expect(bingoUtilsService.blankCard() instanceof Array).toBeTruthy();
    });

    it('should return a blank card array with 5 rows', function () {
      expect(bingoUtilsService.blankCard().length).toEqual(5);
    });

    it('should return an array with zero values', function () {
      var r, c,
        card = bingoUtilsService.blankCard();
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          expect(card[r][c]).toBe(0);
        }
      }
    });
  });

  describe('Blank tiles', function () {
    it('should return tiles', function () {
      expect(bingoUtilsService.blankTiles).toBeTruthy();
    });

    it('should be of type Array', function () {
      expect(bingoUtilsService.blankTiles() instanceof Array).toBeTruthy();
    });

    it('should return a blank card array with 5 rows', function () {
      expect(bingoUtilsService.blankTiles().length).toEqual(5);
    });

    it('should return an array with empty string values', function () {
      var r, c,
        tiles = bingoUtilsService.blankTiles();
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          expect(tiles[r][c]).toBe('');
        }
      }
    });
  });

  describe('Build BallArray', function () {
    it('should return an array of strings', function () {
      var i, ballArray = bingoUtilsService.buildBallArray();
      for (i = 0; i < ballArray.length; i++) {
        expect(typeof ballArray[i]).toBe('string');
      }
    });

    it('should return a non soted list of strings', function () {
      var i,
        ballArray = bingoUtilsService.buildBallArray(),
        sortedBallArray = arrayUtilsService.clone(ballArray).sort(),
        match = true;
      for (i = 0; i < ballArray.length; i++) {
        if (ballArray[i] !== sortedBallArray[i]) {
          match = false;
          break;
        }
      }
      expect(match).toBeFalsy();
    });
  });

  describe('Fill card', function () {
    it('should populate a card array with numbers', function () {
      var r, c;
      var card = bingoUtilsService.blankCard();
      bingoUtilsService.fillCard(card);
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          expect(isNaN(card[r][c])).toBeFalsy();
        }
      }
    });

    it('should not contain duplicate numbers', function () {
      var r, c, x, y,
        sortedArray = [],
        card = bingoUtilsService.blankCard();
      bingoUtilsService.fillCard(card);
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          sortedArray.push(card[r][c]);
        }
      }
      sortedArray.sort();
      for (x = 0; x < sortedArray.length; x++) {
        var occurence = 0;
        for (y = 0; y < sortedArray.length; y++) {
          if (sortedArray[x] === sortedArray[y]) {
            occurence++;
          }
        }
        expect(occurence).toBe(1);
      }
    });
  });

  describe('checkPlay', function () {
    it('should mark tiles based on balls called', function () {
      var i, r, c, result, tiles,
        columns = ['B', 'I', 'N', 'G', 'O'],
        sortedArray = [],
        card = bingoUtilsService.blankCard();
      bingoUtilsService.fillCard(card);
      for (r = 0; r < 5; r++) {
        for (c = 0; c < 5; c++) {
          sortedArray.push(columns[c] + card[r][c]);
        }
      }
      sortedArray.sort();
      tiles = bingoUtilsService.blankTiles();
      for (i = 0; i < sortedArray.length; i++) {
        bingoUtilsService.checkPlay(sortedArray[i], card, tiles);
      }
      result = bingoUtilsService.checkForBingo(tiles);
      expect(result).toBeTruthy();
    });
  });

});
