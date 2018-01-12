/**
 * this test is to test Action.emit(Channel, data)
 */

/* globals test */

var marine = require('../src/index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit('homechannel', 'test', {
            stores: ['Home', 'Robin']
        });

        action.emit('homechannel', 'test');
        action.emit('homechannel');
    }
});

//
setTimeout(() => {
    Action.Home.emittest();
    Action.Home.emit('withoutEmitFn', 'mofei');
    Action.Home.emit({
        channel: 'withoutEmitFn',
        data: 'mofei'
    });
    // console.log(Action.Home.emit)
}, 0);



test('emit with params', (done) => {
    let count = 0;

    Store.on('Other', (datas) => {
        listenCheck(datas);
    });

    Store.on('Robin.homechannel', (datas) => {
        listenCheck(datas);
    });

    Store.on((datas) => {
        listenCheck(datas);
    });

    Store.on('Home', (datas) => {
        listenCheck(datas);
    });

    Store.on('Home.homechannel', (datas) => {
        listenCheck(datas);
    });

    Store.on('Home.withoutEmitFn', StoreData => {
        if (StoreData.data === 'mofei') {
            count += 1;
        }
        checkCount();
    });

    function listenCheck(data) {
        if (data.data === 'test' &&
            data.channel === 'homechannel' &&
            (data.store === 'Robin' || data.store === 'Home')) {
            count += 1;
        }

        checkCount();
    }

    function checkCount() {
        if (count == 10) {
            setTimeout(() => {
                count == 10 ? done() : '';
            }, 1000);
        }
    }
});