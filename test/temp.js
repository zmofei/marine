var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

var act = Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        });
    }
});

var sto = Store.def('Home', {

});

Store.on((datas) => {
    console.log('on2 ', datas);
});

Store.on((datas) => {
    console.log('on2 1', datas);
});
// a();

// Store.on('Home', (datas) => {
//     console.log('on Home', datas);
// });

// Store.on('Home.homechannel', (datas) => {
//     console.log('on Home.homechannel', datas);
// });

// Store.on('Home.homechannel2', (datas) => {
//     console.log('on Home.homechannel', datas);
// });

// Store.Home.on('homechannel', (datas) => {
//     console.log('Home on homechannel', datas);
// });

// Store.Home.on('homechannel2', (datas) => {
//     console.log('Home on homechannel', datas);
// });
// //

// console.log(Action.Home.test())
Action.Home.emittest()