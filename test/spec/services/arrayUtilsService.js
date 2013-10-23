'use strict';

describe('Service: ArrayUtilsService', function() {

  // load the service's module
  beforeEach(module('bingoftuiApp'));

  // instantiate service
  var arrayUtilsService;
  beforeEach(inject(function(ArrayUtilsService) {
    arrayUtilsService = ArrayUtilsService;
  }));

  it('should do something', function() {
    expect(!!arrayUtilsService).toBe(true);
  });


});
