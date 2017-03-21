var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'echotest': (action) => {
        action.echo({
            // channel: 'homechannel'
        });
    },
    'emittest': (action) => {
        action.emit({
            // channel: 'homechannel'
        });
    }
});

// Store.def('Home', {});



test('echo without emit', (done) => {
    let count = 0;
    Store.on('Home.default', (datas) => {
        count++;
        if (count >= 2) {
            done();
        }
    });
});

//
setTimeout(() => {
    Action.Home.echotest();
    Action.Home.emittest();
}, 0);