'use strict';

var my_test_grunt = require('../lib/my-test-grunt.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(my_test_grunt.awesome(), 'awesome', 'should be awesome.');
    test.done();
  },
  'returns false when passed blank strings': function(test) {
    test.expect(1);
    test.equal(my_test_grunt.test(''), false);
    test.done();
  },
  'returns false when passed only punctuation/spaces': function(test) {
    test.expect(1);
    test.equal(my_test_grunt.test(' ?., '), false);
    test.done();
  },
  'returns false when passed non-string values': function(test) {
    test.expect(2);
    test.equal(my_test_grunt.test(1234), false, 'should not accept numbers');
    test.equal(my_test_grunt.test(), false, 'should not accept undefined');
    test.done();
  }
};
