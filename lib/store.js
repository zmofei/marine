'use strict';
/**
 * Store
 * @author Mofei Zhu <13761509829@163.com>
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYS = require('./sys.js');

var StoreID = 0;

var Store = function () {
    function Store(obj) {
        _classCallCheck(this, Store);

        this.maxId = 0;
        this.StoreID = ++StoreID;
        this.name = obj.name;
        // {Object}     datas[channel]
        this.datas = {};

        this.reduceReceive = {};
        this.reduceEmit = {};
    }

    /**
     * @param   {String}    channel
     * @param   {Object}    data
     * @param   {Object}    optiosn.reduce the param of reduce
     */


    _createClass(Store, [{
        key: 'receive',
        value: function receive(channel, data, options) {
            var hasReduice = options && options.reduce;
            if (hasReduice) {
                if (typeof hasReduice !== 'function') {
                    // if (hasReduice.emit) {
                    hasReduice.emit && (this.reduceReceive[channel] = hasReduice.emit);
                    // }
                    if (hasReduice.echo) {
                        this.reduceEmit[channel] = hasReduice.echo;
                    }
                } else {
                    this.reduceReceive[channel] = hasReduice;
                }
            }

            var reduce = this.reduceReceive[channel];
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

    }, {
        key: 'emit',
        value: function emit(channel, options) {
            var data = this.datas[channel] || [];
            var reduce = options && options.reduce;
            reduce = reduce || this.reduceEmit[channel];
            data = reduce ? reduce(data) : data;

            var retobj = {
                data: data,
                channel: channel,
                store: this.name

                // for global listen
            };var globalListenNames = ['root', 'root.' + this.name, 'root.' + this.name + '.' + channel];
            globalListenNames.forEach(function (name) {
                var stores = SYS.storeListens[name];
                stores && stores.forEach(function (sotre) {
                    sotre(retobj);
                });
            });
        }
    }]);

    return Store;
}();

module.exports = Store;