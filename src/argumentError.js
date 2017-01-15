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
