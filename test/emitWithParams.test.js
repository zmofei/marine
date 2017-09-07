/**
 * this test is to test Action.emit(Channel, data)
 */

var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit('homechannel', 'test', {
            stores: ['Home', 'Robin']
        });

        action.emit('homechannel', 'test');
        action.emit('homechannel');
        // action.emit('homechannel');
    }
});

Store.def('Home', {});



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

    function listenCheck(data) {
        if (data.data === 'test' &&
            data.channel === 'homechannel' &&
            (data.store === 'Robin' || data.store === 'Home')) {
            count += 1;
        }
        
        if (count == 8) {
            setTimeout(() => {
                count == 8 ? done() : '';
            }, 1000);
        }
    }
});

//
setTimeout(() => {
    Action.Home.emittest();
}, 0);