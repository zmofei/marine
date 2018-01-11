var marine = require('../src/index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'echotest': (action) => {
        action.echo({
            channel: ['homechannela', 'homechannelb']
        });
    },
    'emittest': (action) => {
        action.emit({
            channel: ['homechannelc', 'homechanneld']
        });
    }
});

test('echo with multil channel - homechannela', (done) => {
    Store.on('Home.homechannela', (datas) => {
        done();
    });
});
test('echo with multil channel - homechannelb', (done) => {
    Store.on('Home.homechannelb', (datas) => {
        done();
    });
});
test('echo with multil channel - homechannelc', (done) => {
    Store.on('Home.homechannelc', (datas) => {
        done();
    });
});
test('echo with multil channel - homechanneld', (done) => {
    Store.on('Home.homechanneld', (datas) => {
        done();
    });
});
//
setTimeout(() => {
    Action.Home.echotest();
    Action.Home.emittest();
}, 0);