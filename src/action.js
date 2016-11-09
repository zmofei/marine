/**
 * Action
 * @author Mofei Zhu <zhuwenlong@baidu.com>
 */

class Action {

    /**
     * obj.actionGroup
     * obj.store
     */
    constructor(obj) {
        this.stores = {
            default: []
        };
        var actionGroup = obj.actionGroup || 'default';
        this.stores[actionGroup] = this.stores[actionGroup] || [];
        this.stores[actionGroup].push(obj.store);
    }

    /**
     * options.actionGroup
     * options.channel
     * options.data
     * options.reduice
     */
    
    emit(options) {
        var _stores = []
        if (options.actionGroup) {
            _stores = _stores.concat(this.stores[options.actionGroup]);
        } else {
            for (var i in this.stores) {
                _stores = _stores.concat(this.stores[i]);
            }
        }

        for (var i in _stores) {
            _stores[i].receive(options.channel, options.data, {
                reduce: options.reduce
            });
        }
    }

    /**
     * options.actionGroup
     * options.channel
     * options.data
     * options.reduice
     */
    echo(options) {
        var _stores = []
        if (options.actionGroup) {
            _stores = _stores.concat(this.stores[options.actionGroup]);
        } else {
            for (var i in this.stores) {
                _stores = _stores.concat(this.stores[i]);
            }
        }

        for (var i in _stores) {
            _stores[i].emit(options.channel, options);
        }
    }
}

export default Action;