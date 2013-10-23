'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bingoftuiApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should should contain a card', function () {
    expect(scope.card).toBeDefined();
  });

  it('should return a ball array of length 75', function () {
    var ballArray = scope.buildBallArray;
    //console.log(ballArray);
    expect(ballArray.length).toBe(75);
  });

});
