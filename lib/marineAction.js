'use strict';

var SYS = require('./sys');
var Action = require('./action');

/**
 * Action
 * @author Mofei Zhu <13761509829@163.com>
 */
function marineAction(Marine) {
    return {
        /**
         * define actions
         * @param name {String} the action's name
         * @param fns {Object} the functions for the action
         * @example
         * Action.def('Home', {
         *      // the functiosn of Home
         * })
         */
        def: function def(name, fns) {
            var _this = this;

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

            Object.keys(fns).forEach(function (key) {
                Marine.Action[name][key] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    var argArr = [Marine.Action[name]];
                    argArr = argArr.concat(args);
                    //
                    return fns[key].apply(_this, argArr);
                };
            });

            return {
                name: name,
                action: Marine.Action[name]
            };
        }
    };
}
module.exports = marineAction;