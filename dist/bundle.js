(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Store
 * @author Mofei Zhu <zhuwenlong@baidu.com>
 */
var StoreID = 0;

var Store = function () {
    function Store() {
        classCallCheck(this, Store);

        this.emits = {};
        this.maxId = 0;
        this.StoreID = ++StoreID;
        // {Object}     datas[channel]
        this.datas = {};

        // {Function}   reduces[channel]
        this.reduces = {};
    }

    /**
     * listen for a channle
     * @param   {String}    channle
     * @param   {Function}  fn
     * @returns {String}    id
     */


    createClass(Store, [{
        key: 'on',
        value: function on(channel, fn) {
            // console.log('on', channel, fn)
            this.emits[channel] = this.emits[channel] || {};
            var id = this.StoreID + '_' + ++this.maxId;
            this.emits[channel][id] = fn;
            return id;
        }

        /**
         * remove the listener  
         * @param   {Number} id the linstner's id
         */

    }, {
        key: 'unbind',
        value: function unbind(id) {
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

    }, {
        key: 'reduce',
        value: function reduce(channel, fn) {
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
    }, {
        key: 'reduceReceive',
        value: function reduceReceive(channel, fn) {
            this.reduceReceive[channel] = fn;
        }
    }, {
        key: 'reduceEmit',
        value: function reduceEmit(channel, fn) {
            this.reduceEmit[channel] = fn;
        }

        /**
         * @param   {String}    channel
         * @param   {Object}    data
         * @param   {Object}    optiosn.method [put|update]
         * @param   {Object}    optiosn.reduce the param of reduce
         */

    }, {
        key: 'receive',
        value: function receive(channel, data, options) {
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
            var emitReduice = reduceParamForEmit ? {
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

    }, {
        key: 'emit',
        value: function emit(channel, options) {
            var data = this.datas[channel];
            var reduce = this.reduceEmit[channel];
            // get reduce param
            var reduceParam = options && options.reduce ? options.reduce : null;
            //
            data = reduce ? reduce(data, reduceParam) : data;
            for (var i in this.emits[channel]) {
                this.emits[channel][i](data);
            }
        }
    }]);
    return Store;
}();

/**
 * Action
 * @author Mofei Zhu <zhuwenlong@baidu.com>
 */

var Action = function () {

    /**
     * obj.actionGroup
     * obj.store
     */
    function Action(obj) {
        classCallCheck(this, Action);

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

    createClass(Action, [{
        key: 'emit',
        value: function emit(options) {
            var _stores = [];
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

    }, {
        key: 'echo',
        value: function echo(options) {
            var _stores = [];
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
    }]);
    return Action;
}();

})));
