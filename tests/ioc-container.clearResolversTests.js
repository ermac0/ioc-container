var chai = require('chai');
var expect = chai.expect;
var decache = require('decache');

function Expected() {};

describe('ioc-container.clearResolvers()', function () {
    beforeEach(function (done) {
        decache('../src/ioc-container.js');
        done();
    });

    it('should remove previously added resolvers', function () {
        var expected = new Expected();
        var notExpected = new Expected();
        var sut = require('../src/ioc-container.js');
        var resolver1 = function (key) {
            switch (key) {
                case 'test':
                    return notExpected;
            }
        };
        var resolver2 = function (key) {
            switch (key) {
                case 'test':
                    return notExpected;
            }
        };
        var resolver3 = function (key) {
            switch (key) {
                case 'test':
                    return expected;
            }
        };

        sut.addResolver(resolver1).addResolver(resolver2);
        sut.clearResolvers();
        sut.addResolver(resolver3)

        var actual = sut.resolve('test');

        expect(actual).to.equal(expected);
    });

    it('should return container', function () {
        var sut = require('../src/ioc-container.js');

        var actual = sut.clearResolvers();

        expect(actual).to.equal(sut);
    });
});
