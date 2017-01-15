'use strict';

var _resolvers = [], _container;

var _version = typeof VERSION  !== "undefined" ? VERSION : '';

var DependencyNotFoundError = require('./dependencyNotFoundError');
var ResolversNotFoundError = require('./resolversNotFoundError');
var ArgumentError = require('./argumentError');

function addResolver(resolver) {
    if (!resolver || typeof resolver !== 'function') {
        throw new ArgumentError('Resolver must be a function.', 'resolver');
    }

    for (var i = 0, max = _resolvers.length; i < max; i++) {
        if (_resolvers[i] === resolver) {
            // Already in the list.
            return _container;
        }
    }

    _resolvers.push(resolver);

    return _container;
}

function removeResolver(resolver) {
    if (!resolver || typeof resolver !== 'function') {
        throw new ArgumentError('Resolver must be a function.', 'resolver');
    }

    for (var i = 0, max = _resolvers.length; i < max; i++) {
        if (_resolvers[i] === resolver) {
            _resolvers.splice(i, 1);
            break;
        }
    }

    return _container;
}

function clearResolvers() {
    _resolvers = [];

    return _container;
}

/// Requires at least 1 parameter - 'key' - but passes all arguments to every resolver.
function resolve(key) {
    if (!key) {
        throw new ArgumentError('key was not specified.', 'key');
    }

    if (!_resolvers.length) {
        throw new ResolversNotFoundError();
    }

    var args = Array.prototype.slice.call(arguments);

    var dependency;

    for (var i = 0, max = _resolvers.length; i < max; i++) {
        dependency = _resolvers[i].apply(this, args);

        if (dependency) {
            return dependency;
        }
    }

    throw new DependencyNotFoundError(key);
}

_container = {
    addResolver: addResolver,

    removeResolver: removeResolver,

    clearResolvers: clearResolvers,

    resolve: resolve,

    // Expose exceptions.
    DependencyNotFoundError: DependencyNotFoundError,

    ResolversNotFoundError: ResolversNotFoundError,

    ArgumentError: ArgumentError,

    version: _version
};

// Singleton.
module.exports = _container;
