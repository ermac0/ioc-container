module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _resolvers = [], _container;

	var _version =  true ? ("1.0.0") : '';

	var DependencyNotFoundError = __webpack_require__(1);
	var ResolversNotFoundError = __webpack_require__(2);
	var ArgumentError = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DependencyNotFoundError(key) {
	    this.dependencyKey = key;
	}

	DependencyNotFoundError.prototype = {
	    toString: function () {
	        return 'Unable to resolve dependency: ' + this.dependencyKey + '.';
	    }
	};

	module.exports = DependencyNotFoundError;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function ResolversNotFoundError(key) {
	    this.dependencyKey = key;
	}

	ResolversNotFoundError.prototype = {
	    toString: function () {
	        return 'No resolvers provided.';
	    }
	};

	module.exports = ResolversNotFoundError;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function ArgumentError(message, paramName) {
	    this.message = message;
	    this.paramName = paramName;
	}

	ArgumentError.prototype = {
	    toString: function () {
	        return '(ArgumentError) ' + (this.paramName ? '[' + this.paramName + '] ' : '') + this.message;
	    }
	};

	module.exports = ArgumentError;


/***/ }
/******/ ]);