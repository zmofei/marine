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


//
setTimeout(() => {
    Action.Home.emit('null', null);
}, 0);