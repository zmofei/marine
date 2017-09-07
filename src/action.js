'use strict';

let SYS = require('./sys');

/**
 * Action
 * @author Mofei Zhu <13761509829@163.com>
 */
class Action {
    constructor(obj) {
        this.name = obj.name;
    }

    /**
     * options.channel
     * options.data
     * options.reduce
     * options.stores
     */
    emit(...arg) {
        let storeNames = [this.name];

        //
        let options = {};
        if (typeof arg[0] === 'object') {
            options = arg[0];
        } else if (typeof arg[0] === 'string') {
            options = {
                channel: arg[0],
                data: arg[1] || null
            };
            if (arg[2]) {
                Object.keys(arg[2]).forEach(key => {
                    options[key] = arg[2][key];
                });
            }
        }
        // 
        if (options.stores) {
            storeNames = options.stores;
        }

        storeNames.forEach((name) => {
            if (!SYS.stores[name]) {
                SYS.basic.store.def(name);
            }

            // if (SYS.stores[name]) {
            let data = options.data;
            let channels = options.channel || 'default';
            channels = typeof channels == 'string' ? [channels] : channels;
            channels.forEach((channel) => {
                SYS.stores[name].receive(channel, data, {
                    reduce: options.reduce
                });
            });
            // }
        });
    }

    /**
     * options.channel
     * options.reduce
     */
    echo(options) {
        const name = this.name;
        if (!SYS.stores[name]) {
            SYS.basic.store.def(name);
        }

        let channels = options.channel || 'default';
        channels = typeof channels == 'string' ? [channels] : channels;
        channels.forEach((channel) => {
            SYS.stores[name].emit(channel, {
                reduce: options.reduce
            });
        });
    }
}
module.exports = Action;