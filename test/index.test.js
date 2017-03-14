let marine = require('../index.js');
let Action = marine.Action;
let Store = marine.Store;

Action.def('Name', {
    'test': (action) => {
        return action.name;
    }
})

Store.def({});
Store.def('Name', {});

describe('action', () => {
    it('action without any param', () => {
        expect(Action.def()).toBe(null);
    });

    it('action without name', () => {
        expect(Action.def({}).name).toBe('Default');
    });

    it('action with name', () => {
        expect(Action.def('Name', {}).name).toBe('Name');
    });



    it('store without any param', () => {
        expect(Store.def()).toBe(null);
    });

    it('action with test fn', () => {
        expect(Action.Name.test()).toBe('Name');
    });
});