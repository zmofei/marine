var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        });
    }
});

Store.def('Home', {

});


describe('action', () => {
    it('listen global', () => {
        //
        setTimeout(() => {
            Action.Home.emittest();
        }, 0);
        //
        return new Promise(resolve => {
            var data = {
                global: null,
                Home: null,
                Homechannel: null,
                Ohter: null
            };

            Store.on((datas) => {
                data.global = datas;
            });

            Store.on('Home', (datas) => {
                data.Home = datas;
            });

            Store.on('Home.homechannel', (datas) => {
                data.Homechannel = datas;
            });

            Store.on('Ohter', (datas) => {
                data.Ohter = datas;
            });

            setTimeout(() => {
                resolve(data);
            }, 0)
        }).then(data => {
            var result = data.global.data == 'test' &&
                data.Home.data == 'test' &&
                data.Homechannel.data == 'test' &&
                data.Ohter === null;
            expect(result).toBe(true)
        })
    });

    it('unlisten', () => {
        //
        setTimeout(() => {
            Action.Home.emittest();
        }, 0);
        //
        return new Promise(resolve => {
            var data = {
                global: null,
                Home: null,
                Homechannel: null,
                Ohter: null
            };

            Store.on((datas) => {
                data.global = datas;
            })();

            Store.on('Home', (datas) => {
                data.Home = datas;
            })();

            Store.on('HomeOther', (datas) => {
                data.Home = datas;
            });

            Store.on('Home.homechannel', (datas) => {
                data.Homechannel = datas;
            })();

            Store.on('Home.homechannelOhter', (datas) => {
                data.Homechannel = datas;
            });

            Store.on('Ohter', (datas) => {
                data.Ohter = datas;
            });

            setTimeout(() => {
                resolve(data);
            }, 0)
        }).then(data => {
            var result = data.global === null &&
                data.Home === null &&
                data.Homechannel === null &&
                data.Ohter === null;
            expect(result).toBe(true)
        })
    });
});