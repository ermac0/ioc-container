var IOC = require('../build/ioc-container.js');

var realResolver = function (key) {
    switch (key.toString().toLowerCase()) {
        case 'remote-service':
            return RealRemoteService;
    }
};

var devResolver = function (key) {
    switch (key.toString().toLowerCase()) {
        case 'remote-service':
            return MockedRemoteService;
    }
};

function RealRemoteService() { }
RealRemoteService.prototype = {
    calculate: function (x, y) {
        console.log('Calculating using real remote service...');

        return x + y;
    }
};

function MockedRemoteService() { }
MockedRemoteService.prototype = {
    calculate: function () {
        console.log('Mocked service.');

        return 2;
    }
};

function Run() {
    console.log('Using ioc-container version: ' + IOC.version);

    var IS_DEV = process.argv.indexOf('--dev') !== -1;

    console.log('Running in ' + (IS_DEV ? 'development' : 'production') + ' mode.');

    IOC.addResolver(IS_DEV ? devResolver : realResolver);

    var RemoteService = IOC.resolve('remote-service');

    var service = new RemoteService();

    var result = service.calculate(1, 5);

    console.log('Calculation result: ' + result);
}

Run();
