var Action = require('./src/action');
var Store = require('./src/store');
var SYS = require('./src/sys.js');

var Marine = {
    Action: {
        /**
         * define actions
         * @param name {String} the action's name
         * @param fns {Object} the functions for the action
         * @example
         * Action.def('Home', {
         *      // the functiosn of Home
         * })
         */
        def(name, fns) {
            if (!name) {
                console.warn('def needs at least one param');
                return null;
            }

            if (typeof name !== 'string') {
                fns = name;
                name = 'Default';
            };

            Marine.Action[name] = SYS.actions[name] = SYS.actions[name] || new Action({
                name: name
            });

            Object.keys(fns).forEach((key) => {
                Marine.Action[name][key] = (...args) => {
                    let argArr = [Marine.Action[name]];
                    argArr = argArr.concat(args);
                    //
                    return fns[key].apply(this, argArr);
                }
            });

            return {
                name: name,
                action: Marine.Action[name]
            }
        }
    },
    Store: {
        /**
         * define store
         * @param name same as Aciton.def
         * @param fns same as Action.def
         */
        def(name, fns) {
            if (!name) {
                console.warn('def needs at least one param');
                return null;
            }

            if (typeof name !== 'string') {
                fns = name;
                name = 'Default';
            };

            Marine.Store[name] = SYS.stores[name] = SYS.stores[name] || new Store({
                name: name
            });

            return {
                name: name,
                store: Marine.Store[name]
            }
        },
        /**
         * global listen
         * Store.on(()=>{})
         * Store.on('Home',()=>{})
         * Store.on('Home.channel',()=>{})
         */
        on(channel, fn) {
            if (typeof channel === 'function') {
                fn = channel;
                channel = 'root';
            } else {
                channel = 'root.' + channel;
            }
            SYS.storeListens[channel] = SYS.storeListens[channel] || [];
            SYS.storeListens[channel].push(fn);
            return () => {
                SYS.storeListens[channel] = SYS.storeListens[channel].filter((storeFn) => {
                    var isTheFn = storeFn !== fn;
                    return isTheFn;
                });
            }
        }
    }
}

module.exports = Marine;