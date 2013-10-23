/**
 * @name ArrayUtilsService
 * @description Service which encapsulates Array related functionality.
 * @author Carlos Justiniano
 */
angular.module('bingoftuiApp')
  .service('ArrayUtilsService', function () {
    'use strict';
    /**
     * @name isArray
     * @description is number fund in array
     * @param {Array} array
     * @param {Number} num
     * @returns {Number} result, position where number if found else -1
     */
    this.inArray = function (array, num) {
      var i, position = -1;
      for (i = 0; i < array.length; i++) {
        if (array[i] === num) {
          position = i;
          break;
        }
      }
      return position;
    };

    /**
     * @name shuffle
     * @description Fisher–Yates shuffle
     * @param {Array} array
     * @see: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
     * @returns {Array} shuffled array
     */
    this.shuffle = function (array) {
      var counter = array.length, temp, index;
      // While there are elements in the array
      while (counter--) {
        // Pick a random index
        index = (Math.random() * counter) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    };

    /**
     * @name clone
     * @param array
     * @returns {Array} cloned
     */
    this.clone = function (array) {
      return array.slice(0);
    };

  });
