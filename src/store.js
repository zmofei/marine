'use strict';
/**
 * Store
 * @author Mofei Zhu <13761509829@163.com>
 */

var SYS = require('./sys.js');

let StoreID = 0;

class Store {

    constructor(obj) {
        this.emits = {};
        this.maxId = 0;
        this.StoreID = ++StoreID;
        this.name = obj.name;
        // {Object}     datas[channel]
        this.datas = {}

        // {Function}   reduces[channel]
        this.reduces = {}
    }

    /**
     * listen for a channle
     * @param   {String}    channle
     * @param   {Function}  fn
     * @returns {String}    id
     */
    on(channel, fn) {
        // console.log('on', channel, fn)
        this.emits[channel] = this.emits[channel] || {};
        let id = this.StoreID + '_' + (++this.maxId);
        this.emits[channel][id] = fn;
        return id;
    }

    /**
     * remove the listener  
     * @param   {Number} id the linstner's id
     */
    unbind(id) {
        for (var channel in this.emits) {
            var typeFn = this.emits[channel];
            for (var _id in typeFn) {
                if (_id == id) {
                    console.warn(id, channel);
                    delete this.emits[channel][id];
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @param   {Object}    channel
     * @param   {Object}    channel.receive
     * @param   {Object}    channel.emit
     * @param   {Function}  fn
     */
    reduce(channel, fn) {
        if (typeof fn == 'function') {
            this.reduceReceive(channel, fn);
        } else {
            if (fn.receive) {
                this.reduceReceive(channel, fn.receive);
            }
            if (fn.emit) {
                this.reduceEmit(channel, fn.emit);
            }
        }
    }
    reduceReceive(channel, fn) {
        this.reduceReceive[channel] = fn;
    }
    reduceEmit(channel, fn) {
        this.reduceEmit[channel] = fn;
    }

    /**
     * @param   {String}    channel
     * @param   {Object}    data
     * @param   {Object}    optiosn.method [put|update]
     * @param   {Object}    optiosn.reduce the param of reduce
     */
    receive(channel, data, options) {
        var reduce = this.reduceReceive[channel];
        // get reduce param
        var _reduceParam = options && options.reduce;
        var reduceParamForReceive = null;
        var reduceParamForEmit = null;
        if (_reduceParam) {
            var isReduceParamConvenience = _reduceParam.receive || _reduceParam.emit;
            if (isReduceParamConvenience) {
                reduceParamForReceive = _reduceParam.receive || null;
                reduceParamForEmit = _reduceParam.emit || null;
            } else {
                reduceParamForReceive = _reduceParam;
            }
        }
        //
        data = reduce ? reduce(data, reduceParamForReceive) : data;
        this.datas[channel] = data;

        // emit
        let emitReduice = reduceParamForEmit ? {
            reduce: reduceParamForEmit
        } : null;
        this.emit(channel, emitReduice);
    }

    /**
     * emit data to a special channel
     * @param   {String}    channel
     * @param   {Object}    options
     * @param   {Object}    options.reduce  the param of reduce
     */
    emit(channel, options) {
        var data = this.datas[channel];
        var reduce = this.reduceEmit[channel];
        // get reduce param
        var reduceParam = (options && options.reduce) ? options.reduce : null;
        //
        data = reduce ? reduce(data, reduceParam) : data;
        var retobj = {
            data: data,
            channel: channel,
            store: this.name
        }
        for (var i in this.emits[channel]) {
            this.emits[channel][i](retobj);
        }
        // for global listen
        var globalListenNames = ['root', 'root.' + this.name, 'root.' + this.name + '.' + channel];
        globalListenNames.forEach((name) => {
            var stores = SYS.storeListens[name];
            stores && stores.forEach((sotre) => {
                sotre(retobj);
            });
        });
    }
}


module.exports = Store;