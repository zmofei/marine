var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test'
        });
    },
    'echotest': (action) => {
        action.echo({
            channel: 'homechannel'
        });
    }
});

Store.def('Home', {});

test('Store Pass', (done) => {
    count = 0;

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
        if (count == 6) {
            setTimeout(() => {
                count == 6 ? done() : '';
            }, 1000)
        }
    }
});

//
setTimeout(() => {
    Action.Home.emittest();
    Action.Home.echotest();
}, 0);