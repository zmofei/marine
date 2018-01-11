var marine = require('../src/index.js');
var Action = marine.Action;
var Store = marine.Store;

var datas = [9, 0, 0, 100, 23, 412, 5];


Action.def('Home', {
    'reducefn': (action) => {
        action.emit({
            channel: 'reducefn',
            data: datas,
            reduce: data => data.sort((a, b) => a - b)
        });
    },
    'reduceemit': (action) => {
        action.emit({
            channel: 'reduceemit',
            data: datas,
            reduce: {
                emit: data => data.sort((a, b) => a - b)
            }
        });
    },
    'reduceecoh': (action) => {
        action.emit({
            channel: 'reduceecoh',
            data: datas,
            reduce: {
                emit: data => data.sort((a, b) => b - a),
                echo: data => data.sort((a, b) => a - b)
            }
        });
    }
});

Store.def('Home', {});

test('reducefn', (done) => {
    Store.on('Home.reducefn', (datas) => {
        expect([0, 0, 5, 9, 23, 100, 412]).toEqual(datas.data)
        done();
    });
});

test('reduceemit', (done) => {
    Store.on('Home.reduceemit', (datas) => {
        expect([0, 0, 5, 9, 23, 100, 412]).toEqual(datas.data)
        done();
    });
});
test('reduceecoh', (done) => {
    Store.on('Home.reduceecoh', (datas) => {
        expect([0, 0, 5, 9, 23, 100, 412]).toEqual(datas.data)
        done();
    });
});
//
setTimeout(() => {
    Action.Home.reducefn();
    Action.Home.reduceemit();
    Action.Home.reduceecoh();
}, 0);