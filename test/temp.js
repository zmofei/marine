var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

var act = Action.def('Home', {
    'test': (action) => {
        return action.name;
    },
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        });

        // action.emit({
        //     channel: 'sdfadfsaf',
        //     data: 'test',
        //     // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        // });
    }
});

var sto = Store.def('Home', {

});

/**
 * datas.store
 * datas.channel
 * datas.data
 */


var a = Store.on((datas) => {
    console.log('on2 ', datas);
});
a();

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