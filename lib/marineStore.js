'use strict';

var Store = require('./store');
var SYS = require('./sys.js');

function marineStore(Marine) {
    return {
        /**
         * define store
         * @param name same as Aciton.def
         * @param fns same as Action.def
         */
        def: function def(name, reduce) {
            if (!name) {
                console.warn('def needs at least one param');
                return null;
            }

            if (typeof name !== 'string') {
                reduce = name;
                name = 'Default';
            };

            Marine.Store[name] = SYS.stores[name] = SYS.stores[name] || new Store({
                name: name
            });
            // TODO: store reduce

            return {
                name: name,
                store: Marine.Store[name]
            };
        },

        /**
         * global listen
         * Store.on(()=>{})
         * Store.on('Home',()=>{})
         * Store.on('Home.channel',()=>{})
         * TODO:
         * Store.Home.on(channel=>{})
         */
        on: function on(channel, fn) {
            if (typeof channel === 'function') {
                fn = channel;
                channel = 'root';
            } else {
                channel = 'root.' + channel;
            }
            SYS.storeListens[channel] = SYS.storeListens[channel] || [];
            SYS.storeListens[channel].push(fn);
            return function () {
                SYS.storeListens[channel] = SYS.storeListens[channel].filter(function (storeFn) {
                    var isTheFn = storeFn !== fn;
                    return isTheFn;
                });
            };
        }
    };
}

module.exports = marineStore;