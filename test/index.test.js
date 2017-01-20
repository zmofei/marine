var marine = require('../index.js');

describe('action', () => {
    it('action without name', () => {
        expect(marine.Action.def({}).name).toBe('Default');
    });

    it('action with name', () => {
        expect(marine.Action.def('Name', {}).name).toBe('Name');
    });

    var m = marine.Action.def('Name', {
        'test': (action) => {
            return action.name;
        },
        'emittest': (action) => {
            action.emit({
                // stores:['Name','Named','Named3']
            });
        }
    })

    it('action with test fn', () => {
        expect(marine.Action.Name.test()).toBe('Name');
    });

    it('action emit', () => {
        console.log(marine.Action.Name.emittest())
        // expect().toBe('Name');
    });

});