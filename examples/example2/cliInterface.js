function CliInterface() { }

CliInterface.prototype = {
    init: function (greetHandler) {
        var stdin = process.openStdin();

        console.log('Enter your name: ');

        stdin.addListener("data", function (d) {
            stdin.destroy();
            greetHandler(d.toString().trim());
        });
    },

    greet: function (message) {
        console.log(message);
    }
};

module.exports = CliInterface;
