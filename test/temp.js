var marine = require('../src/index.js');
var Action = marine.Action;
var Store = marine.Store;

// var datas = [];
// for (var i = 0; i < 10; i++) {
//     datas.push(parseInt(Math.random() * 100))
// };

// Action.Mofei.actionWidthoutDefine('xxxx');

// // Store.def('Home', {});
// Store.on((datas) => {
//     console.log(datas);
// });

// //

// Action.Home.emittest(datas);

Store.on((data) => {
    console.log(data);
});

Action.def('Home', {
    'emittest': (action) => {
        action.emit('homechannel');
    }
});

Action.Home.emittest();

console.log(Action.Home.emit('test', null))