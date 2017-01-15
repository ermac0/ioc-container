var chai = require('chai');
var expect = chai.expect;
var decache = require('decache');

function Expected() {};

describe('ioc-container.addResolver()', function () {
    beforeEach(function (done) {
        decache('../src/ioc-container.js');
        done();
    });

    it('should add resolver if a function', function () {
        var expected = new Expected();
        var sut = require('../src/ioc-container.js');
        var resolver = function (key) {
            switch (key) {
                case 'test':
                    return expected;
            }
        };

        sut.addResolver(resolver);

        var actual = sut.resolve('test');

        expect(actual).to.equal(expected);
    });

    it('should add same resolver only once', function () {
        var expected = new Expected();
        var counter = 0;
        var sut = require('../src/ioc-container.js');
        var resolver = function (key) {
            counter++;
        };

        sut.addResolver(resolver).addResolver(resolver);
        var failed = true;

        try {
            sut.resolve('test');
            failed = false;
        }
        catch (ex) {
        }

        expect(failed).to.equal(true);
        expect(counter).to.equal(1);
    });

    it('should return container if successful', function () {
        var sut = require('../src/ioc-container.js');
        var resolver = function (key) {
        };

        var actual = sut.addResolver(resolver);

        expect(actual).to.equal(sut);
    });
});
