'use strict';

let SYS = require('./sys');
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
    }
}
module.exports = marineAction;