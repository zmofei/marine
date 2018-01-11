'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SYS = require('./sys');

/**
 * Action
 * @author Mofei Zhu <13761509829@163.com>
 */

var Action = function () {
    function Action(obj) {
        _classCallCheck(this, Action);

        this.name = obj.name;
    }

    /**
     * options.channel
     * options.data
     * options.reduce
     * options.stores
     */


    _createClass(Action, [{
        key: 'emit',
        value: function emit() {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            var storeNames = [this.name];

            //
            var options = {};
            if (_typeof(arg[0]) === 'object') {
                options = arg[0];
            } else if (typeof arg[0] === 'string') {
                options = {
                    channel: arg[0],
                    data: arg[1] || null
                };
                if (arg[2]) {
                    Object.keys(arg[2]).forEach(function (key) {
                        options[key] = arg[2][key];
                    });
                }
            }
            // 
            if (options.stores) {
                storeNames = options.stores;
            }

            storeNames.forEach(function (name) {
                if (!SYS.stores[name]) {
                    SYS.basic.store.def(name);
                }

                // if (SYS.stores[name]) {
                var data = options.data;
                var channels = options.channel || 'default';
                channels = typeof channels == 'string' ? [channels] : channels;
                channels.forEach(function (channel) {
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

    }, {
        key: 'echo',
        value: function echo(options) {
            var name = this.name;
            if (!SYS.stores[name]) {
                SYS.basic.store.def(name);
            }

            var channels = options.channel || 'default';
            channels = typeof channels == 'string' ? [channels] : channels;
            channels.forEach(function (channel) {
                SYS.stores[name].emit(channel, {
                    reduce: options.reduce
                });
            });
        }
    }]);

    return Action;
}();

module.exports = Action;