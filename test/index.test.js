var marine = require('../index.js');

describe('action', () => {
    it('action without name', () => {
        expect(marine.Action.def({}).name).toBe('Default');
    });

    it('action with name', () => {
        expect(marine.Action.def('Name', {}).name).toBe('Name');
    });

    marine.Action.def('Name', {
        'test': (action) => {
            return action.name;
        }
    })

    marine.Store.def('Name', {})

    it('action with test fn', () => {
        expect(marine.Action.Name.test()).toBe('Name');
    });
});