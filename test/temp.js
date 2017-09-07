var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

var datas = [];
for (var i = 0; i < 10; i++) {
    datas.push(parseInt(Math.random() * 100))
};

Action.Mofei.actionWidthoutDefine('xxxx');

// Store.def('Home', {});
Store.on((datas) => {
    console.log(datas);
});

//

Action.Home.emittest(datas);