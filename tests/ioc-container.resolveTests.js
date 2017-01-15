var chai = require('chai');
var expect = chai.expect;
var decache = require('decache');

function Expected() {};

describe('ioc-container.resolve()', function () {
    beforeEach(function (done) {
        decache('../src/ioc-container.js');
        done();
    });

    it('should throw DependencyNotFoundError if dependency cannot be resolved', function () {
        var sut = require('../src/ioc-container.js');
        var resolver1 = function (key) {
        };

        sut.addResolver(resolver1);

        try {
            sut.resolve('test');
        }
        catch (ex) {
            expect(ex instanceof sut.DependencyNotFoundError).to.equal(true);

            return;
        }

        throw new Error('Should not reach this point.');
    });


    it('should throw ResolversNotFoundError if no resolvers were added', function () {
        var sut = require('../src/ioc-container.js');

        try {
            sut.resolve('test');
        }
        catch (ex) {
            expect(ex instanceof sut.ResolversNotFoundError).to.equal(true);

            return;
        }

        throw new Error('Should not reach this point.');
    });

    it('should throw ArgumentError if key was not specified', function () {
        var sut = require('../src/ioc-container.js');
        var resolver1 = function (key) {
        };

        sut.addResolver(resolver1);

        try {
            sut.resolve();
        }
        catch (ex) {
            expect(ex instanceof sut.ArgumentError).to.equal(true);
            return;
        }

        throw new Error('Should not reach this point.');
    });

    it('should pass all arguments to resolver', function () {
        var sut = require('../src/ioc-container.js');
        var argCount = 0;

        var resolver1 = function (key) {
            argCount = arguments.length;
            return {};
        };

        sut.addResolver(resolver1);

        sut.resolve('test', 1, true);
        
        expect(argCount).to.equal(3);
    });
});
