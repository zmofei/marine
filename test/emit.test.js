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

test('Emite null should get null', (done) => {
    Store.on('Home.null', (datas) => {
        if (datas.data === null) {
            done();
        }
    });
});

test('Listen Pass', (done) => {
    let count = 0;

    Store.on('Other', (datas) => {
        listenCheck(datas)
    });

    Store.on((datas) => {
        listenCheck(datas)
    });

    Store.on('Home', (datas) => {
        listenCheck(datas)
    });

    Store.on('Home.homechannel', (datas) => {
        listenCheck(datas)
    });

    function listenCheck(data) {
        if (data.data === 'test' &&
            data.channel === 'homechannel' &&
            data.store === 'Home') {
            count += 1;
        }
        console.log(count)
        if (count == 3) {
            setTimeout(() => {
                count == 3 ? done() : '';
            }, 1000)
        }
    }
});

//
setTimeout(() => {
    Action.Home.emittest();
    Action.Home.emit('null', null);
}, 0);