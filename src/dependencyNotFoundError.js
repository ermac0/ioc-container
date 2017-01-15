function DependencyNotFoundError(key) {
    this.dependencyKey = key;
}

DependencyNotFoundError.prototype = {
    toString: function () {
        return 'Unable to resolve dependency: ' + this.dependencyKey + '.';
    }
};

module.exports = DependencyNotFoundError;
