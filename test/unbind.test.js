/* globals test */
var marine = require('../src/index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test'
        });
    }
});

Store.def('Home', {});


test('Unbind test', (done) => {
    let count = 0;

    Store.on('Other', (datas) => {
        listenCheck(datas);
    })();

    Store.on((datas) => {
        listenCheck(datas);
    })();

    Store.on('Home', (datas) => {
        listenCheck(datas);
    })();

    Store.on('Home.homechannel', (datas) => {
        listenCheck(datas);
    })();

    function listenCheck(data) {
        if (data.data === 'test' &&
            data.channel === 'homechannel' &&
            data.store === 'Home') {
            count += 1;
        }
    }

    setTimeout(() => {
        count == 0 ? done() : '';
    }, 1000);
});

//
setTimeout(() => {
    Action.Home.emittest();
}, 0);