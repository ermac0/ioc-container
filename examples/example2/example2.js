(function () {
    var IOC = require('./ioc-container');
    var isBrowser = typeof window !== 'undefined';

    function browserResolver(key) {
        switch (key.toString().toLowerCase()) {
            case 'interface':
                return require('./browserInterface');
        }
    }

    function cliResolver(key) {
        switch (key.toString().toLowerCase()) {
            case 'interface':
                return require('./cliInterface');
        }
    }

    IOC.addResolver(isBrowser ? browserResolver : cliResolver);

    function run() {
        var UI = IOC.resolve('interface');

        var ui = new UI();

        ui.init(function (name) {
            ui.greet('Hi ' + name + '! Welcome to the real world.');
        });
    }

    run();
})();
