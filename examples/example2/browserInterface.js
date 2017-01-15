var $ = jQuery;

function BrowserInterface() { }

BrowserInterface.prototype = {
    init: function (greetHandler) {
        $('<label>Enter your name: <input type="text" id="name" /></label> <button type="button" id="go"> Go </button>').appendTo(document.body);

        $('#go').click(function (e) {
            greetHandler($('#name').val());
        });
    },

    greet: function (message) {
        alert(message);
    }
};

module.exports = BrowserInterface;
