'use strict';
/**
 * Store
 * @author Mofei Zhu <13761509829@163.com>
 */

var SYS = require('./sys.js');

let StoreID = 0;

class Store {

    constructor(obj) {
        this.maxId = 0;
        this.StoreID = ++StoreID;
        this.name = obj.name;
        // {Object}     datas[channel]
        this.datas = {}

        this.reduceReceive = {};
        this.reduceEmit = {};
    }


    /**
     * @param   {String}    channel
     * @param   {Object}    data
     * @param   {Object}    optiosn.method [put|update]
     * @param   {Object}    optiosn.reduce the param of reduce
     */
    receive(channel, data, options) {
        let hasReduice = options && options.reduce;
        if (hasReduice) {
            if (typeof (hasReduice) !== 'function') {
                if (hasReduice.emit) {
                    this.reduceReceive[channel] = hasReduice.emit;
                }
                if (hasReduice.echo) {
                    this.reduceEmit[channel] = hasReduice.echo;
                }
            } else {
                this.reduceReceive[channel] = hasReduice;
            }
        }


        let reduce = this.reduceReceive[channel];
        data = reduce ? reduce(data) : data;
        this.datas[channel] = data;
        // emit data
        this.emit(channel);
    }

    /**
     * emit data to a special channel
     * @param   {String}    channel
     * @param   {Object}    options
     * @param   {Object}    options.reduce  the param of reduce
     */
    emit(channel, options) {
        var data = this.datas[channel] || [];
        var reduce = options && options.reduce;
        reduce = reduce || this.reduceEmit[channel];
        data = reduce ? reduce(data) : data;

        var retobj = {
            data: data,
            channel: channel,
            store: this.name
        }

        // for global listen
        var globalListenNames = [
            'root',
            'root.' + this.name,
            'root.' + this.name + '.' + channel
        ];
        globalListenNames.forEach((name) => {
            var stores = SYS.storeListens[name];
            stores && stores.forEach((sotre) => {
                sotre(retobj);
            });
        });
    }
}


module.exports = Store;