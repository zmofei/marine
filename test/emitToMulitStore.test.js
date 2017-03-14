var marine = require('../index.js');
var Action = marine.Action;
var Store = marine.Store;

Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'mulit',
            stores: ['Home', 'Mofei', 'Who']
        });
    }
});

Store.def('Home', {});
Store.def('Mofei', {});

setTimeout(() => {
    Action.Home.emittest();
}, 0);

test('mulitStore-Home', done => {
    Store.on('Home.homechannel', (datas) => {
        expect(datas.data).toBe('mulit');
        done();
    });
});

test('mulitStore-Mofei', done => {
    Store.on('Mofei.homechannel', (datas) => {
        expect(datas.data).toBe('mulit');
        done();
    });
});

// describe('action', () => {
//     setTimeout(() => {
//         Action.Home.emittest();
//     }, 0);
//     it('Home Store Listen', () => {

//     });

//     it('Mofei Store Listen', () => {
//         Store.on('Mofei.homechannel', (datas) => {
//             // expect(datas).toBe('mulit1')
//         });
//     });
// });