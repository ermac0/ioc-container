function ResolversNotFoundError(key) {
    this.dependencyKey = key;
}

ResolversNotFoundError.prototype = {
    toString: function () {
        return 'No resolvers provided.';
    }
};

module.exports = ResolversNotFoundError;
