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
     */
    emit(options) {
        let storeNames = [this.name];
        if (options.stores) {
            storeNames = options.stores;
        }

        storeNames.forEach((name) => {
            if (SYS.stores[name]) {
                let data = options.data;
                let channels = options.channel || 'default';
                channels = typeof channels == 'string' ? [channels] : channels;
                channels.forEach((channel) => {
                    SYS.stores[name].receive(channel, data, {
                        reduce: options.reduce
                    });
                });
            } else {
                console.warn(`
                    Can't fine any store called ${name},
                    You may need:
                        define a store called ${name} [Store.def(${name},{})]
                    OR
                        assign another store name on options [.emit({store:'storename'})]
                `)
            }
        });
    }

    /**
     * options.channel
     * options.reduce
     */
    echo(options) {
        const name = this.name;
        if (SYS.stores[name]) {
            let channels = options.channel || 'default';
            channels = typeof channels == 'string' ? [channels] : channels;
            channels.forEach((channel) => {
                SYS.stores[name].emit(channel, {
                    reduce: options.reduce
                });
            });
        }
    }
}
module.exports = Action;