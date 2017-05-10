# marine
marine 是一个极简的Flux的实现

[![Build Status](https://travis-ci.org/zmofei/marine.svg?branch=master)](https://travis-ci.org/zmofei/marine)
[![npm version](https://img.shields.io/npm/v/marine.svg?style=flat-square)](https://www.npmjs.com/package/marine)

## 简单示例

#### 1. 定义 Action 和 Store
```javascript
// 引入Action
import { Action, Store } from 'marine';
// 建立一个叫Demo的Action，Demo中有一个test方法
Action.def('Demo', {
    // test方法，可以通过Action.Demo.test()调用
    'test': (action, name) => {
        action.emit({
            channel: 'homechannel',
            data: name || 'test'
        });
    }
});
// 建立一个Dome的Store
```
#### 2.Store监听事件
```javascript
// a.js
// 引入Store
import { Action, Store } from 'marine';
// 监听test事件
Store.on('Demo.test', (data) => {
    // 当执行Action.Demo.test()时，此处就能接收到
    console.log(data);
});

// 监听Demo下所有的频道事件
Store.on('Demo', (data) => {
    // 当执行Action.Demo下的任何一个频道时，此处就能接收到
    console.log(data);
});

// 监听所有的Action的所有频道
Store.on((data) => {
    // 当执行任何一个Action下的任何一个频道时，此处就能接收到
    console.log(data);
});
```
#### 3.Action触发事件
```javascript
// b.js
// 引入Action
import { Action, Store } from 'marine';

// 触发test事件，此时a.js中的3个监听均能同时受到消息。
Action.Demo.test('I am Marine');
```

## API

### 1. Action

#### 1.1 Action.def(ChannelName, ActionFunctions)

Action.def方法用来定义Action，其接受2个参数，ChannelName 和 ActionFunctions。 

##### 1.1.1 ChannelName [String]

ChannelName为当前创建的Action的名称，声明完成之后就可以通过Action.ChannelName来调用对应的ActionFunctions里面的方法了。

例如我们声明一个名为 Mofei 的 Action，Mofei有2个方法分别为`coding`和`sleep`:

```javascript
import { Action, Store } from 'marine';

Action.def('Mofei', {
    coding: [Function],
    sleep: [Function]
})
```

声明完成之后我们就可以通过Action.Mofei调用对应的方法了，如：

```javascript
Action.Mofei.coding();
Action.Mofei.sleep();
```

##### 1.1.2 ActionFunctions [Object]

ActionFunctions为某个Action的只方法，如上例子中的coding和sleep方法，在创建一个Action时，我们可以指定创建多个Action方法。

#### 1.2 action

action为ActionFunctions的第一个参数，默认在执行ActionFunctions时Marine会自动的在第一个参数中注入action。

如下例子中，在Action.Mofei.coding方法中第一个形参就是我们的action：

```javascript
import { Action, Store } from 'marine';

Action.def('Mofei', {
    coding: (action,param)=>{
        // action.xxx
    }
})
```
#### 1.2.1 action.emit(emitParam)
#### 1.2.2 action.echo(echoParam)
#### 1.2.3 action.[emit|echo].reduice(reduiceParam)
#### 1.2.4 action.[emit|echo].reduice(reduiceParam)
#### 1.2.5 action.[emit|echo].channel(channelNames) [String|Array]
#### 1.2.6 action.[emit|echo].stores(storesNames) [Array]


### 2. Store

#### 2.1 Store.on(ChannelName, callback)