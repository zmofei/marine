# marine
marine 是一个极简的Flux的实现

[![Build Status](https://travis-ci.org/zmofei/marine.svg?branch=master)](https://travis-ci.org/zmofei/marine)
[![npm version](https://img.shields.io/npm/v/marine.svg?style=flat-square)](https://www.npmjs.com/package/marine)

## 简单示例

#### 1. 定义 Action 和 Store
```javascript
// 引入Action
var marine = require('../index.js');
var Action = marine.Action;
// 建立一个叫Demo的Action，Demo中有一个test方法
Action.def('Demo', {
    'test': (action, name) => {
        action.emit({
            channel: 'homechannel',
            data: name || 'test'
        });
    }
});
// 建立一个Dome的Store
Store.def('Home', {});
```
#### 2.Store监听事件
```javascript
// a.js
// 引入Store
var marine = require('../index.js');
var Action = marine.Store;
// 监听test事件
Store.on('Demo.test', (data) => {
    // 当触发Action.Demo.test()时，此处就能接收到
    console.log(data);
});

// 监听Demo下所有的频道事件
Store.on('Demo.test', (data) => {
    // 当触发Action.Demo下的任何一个频道时，此处就能接收到
    console.log(data);
});

// 监听所有的Action的所有频道
Store.on((data) => {
    // 当触发任何一个Action下的任何一个频道时，此处就能接收到
    console.log(data);
});
```
#### 3.Action触发事件
```javascript
// b.js
// 引入Action
var marine = require('../index.js');
var Action = marine.Action;

// 触发test事件，此时a.js中的3个监听均能同时受到消息。
Action.Demo.test('I am Marine');
```
