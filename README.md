# marine
marine 是一个极简的Flux的实现，简化了Action和Store的定义，优化了调用不同Action的方法以及Store监听事件的流程。

[![Build Status](https://travis-ci.org/zmofei/marine.svg?branch=master)](https://travis-ci.org/zmofei/marine)
[![npm version](https://img.shields.io/npm/v/marine.svg?style=flat-square)](https://www.npmjs.com/package/marine)

## 简单示例

#### 1. 定义 Action

```javascript
// 引入  Action, Store
import { Action, Store } from 'marine';

/**
 * 每个Action有一个名字，以及多个方法
 * Action可以通过Action.def定义
 * 
 * 下例中Action的名字是‘Demo’，它有一个test的方法，调用的是时候，可以用通过 Action.Demo.test() 调用。 
 */

Action.def('Demo', {
    'test': (action, name) => {
        action.emit({
            channel: 'homechannel',
            data: name || 'test'
        });
    }
});
```

#### 2. 通过Store监听Action

```javascript
// a.js

// 引入  Action, Store
import { Action, Store } from 'marine';

/**
 * 想要监听一个事件可以通过Store.on来监听
 * on接受2个参数，第一个参数是你要监听的频道，有下面的3中情况
 * 1. 监听某个Action下的某个方法，比如'Demo.test'，会监听到Demo的test方法的事件
 * 2. 监听某个Action下所有的方法，比如'Demo'，这样会监听到Demo下的所有的方法的事件
 * 3. 监听所有Action下所有的方法，省略第一个参数，就会监听到所有Demo下所有的方法的事件
 **/

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

// 引入 Action, Store
import { Action, Store } from 'marine';

/**
 * 想要调用某个Action的方法，在定了相关的Action之后，可以直接通过Action.[ActionName].[ActionFunction] 调用
 **/

// 触发test事件，此时a.js中的3个监听均能同时受到消息。
Action.Demo.test('I am Marine');
```

## API

### 1. Action

#### 1.1 Action.def(ChannelName, ActionFunctions)

Action.def方法用来定义Action，其接受2个参数，ChannelName 和 ActionFunctions。 

##### 1.1.1 ChannelName [String]

ChannelName为当前创建的Action的名称，声明完成之后就可以通过Action.ChannelName来调用对应的ActionFunctions里面的方法了。

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
    coding: (action, param)=>{
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