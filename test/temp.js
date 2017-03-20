var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

var datas = [];
for (var i = 0; i < 10; i++) {
    datas.push(parseInt(Math.random() * 100))
};

Action.def('Home', {
    'emittest': (action, datas) => {
        action.emit({
            channel: 'homechannel',
            data: datas,
            reduce: {
                emit: (data) => {
                    data.sort((a, b) => b - a);
                    return data;
                },
                echo: (data) => {
                    data.sort((a, b) => b - a);
                    return data;
                }
            }
        });
    },
    'echotest': (action) => {
        action.echo({
            channel: 'homechannel'
        });
    }
});

Store.def('Home', {});


Store.on('Home.homechannel', (datas) => {
    console.log(datas);
});

//

Action.Home.emittest(datas);
Action.Home.echotest();
Action.Home.echotest();