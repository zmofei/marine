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
 * Action可以通过Action.def定义
 * 
 * 下例中Action的名字是‘Demo’，它有一个test的方法，调用的时候，可以用通过 Action.Demo.test() 调用。 
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
 * 1. 监听某个Action下的某个频道，比如'Demo.homechannel'，会监听到来自Action Demo的homechannel频道的事件
 * 2. 监听某个Action下所有的频道，比如'Demo'，这样会监听到Demo下的所有的频道的事件
 * 3. 监听所有Action下所有的频道，省略第一个参数，就会监听到所有Demo下所有的频道的事件
 **/

// 监听test事件
Store.on('Demo.homechannel', (data) => {
    // 当执行Action.Demo.homechannel()时，此处就能接收到
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

#### 3.View中通过Action触发事件
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

#### 1.1 Action.def(ActionName, ActionFunctions)

该方法用以定义Action，是快速定义Action的语法糖。

##### 1.1.1 ActionName [String]

ActionName为当前创建的Action的名称，声明完成之后就可以通过 `Action[ActionName]` 来获取到对应的Action了。

例如我们声明一个名为 Mofei 的 Action，(其中的ActionFunctions我们随后就会介绍):

```javascript
import { Action } from 'marine';

Action.def('Mofei', ActionFunctions)
```

定义之后，就可以在任意的页面中通过引入Action，然后调用Action.Mofei获取到这个Action对象了,例如：

```javascript
import { Action } from 'marine';

// 此时Action.Mofei就是我们刚刚通过def定义的Action了。
console.log(Action.Mofei);
```

##### 1.1.2 ActionFunctions [Object]

接下来介绍一下ActionFunctions，ActionFunctions为JSON类型的键值对，其中key为当前Action实例的方法名称，value为Function对应的具体的Action方法。在Action实例方法中，`第一个参数就是我们当前的Action实例对象`，例如

例如在刚刚名为 Mofei 的 Action，我们想添加2个方法 `coding`和`sleep`:

```javascript
import { Action } from 'marine';

// 定义Mofei实例，后续可以通过 Action.Mofei获取该实例
Action.def('Mofei', {
    // 定义实例方法，后续可以通过 Action.Mofei.coding('javascript')调用该方法
    // 实例方法的第一个参会自动传入当前的Action实例，该处就是Action.Mofei，
    // 第二个参数开始为用户自定义传入的参数，
    // 比如这里的第二个参数language就是Action.Mofei.coding('javascript')中的`javascirpt`
    coding: (action, language)=>{
        // 实例方法中我们可以直接通过Aciton的任何方法
        // 这里我们调用了action的emit方法
        action.emit({
            channel: 'coding',
            data: `I am coding with ${language}`
        })
    },
    sleep: (action,place)=>{
        action.emit({
            channel: 'coding',
            data: `I am sleeping at ${place}`
        })
    }
})
```

声明完成之后我们就可以通过Action.Mofei调用对应的方法了，如：

```javascript
// 引入Action
import { Action } from 'marine';

Action.Mofei.coding('javascript');
Action.Mofei.sleep('home');
```

#### 1.1.3 Action.def 和 new Action() 方式对比。

上述实例中我们通过Action.def快速定义了Action实例，如果不同通过Action.def定义的话，我们的写法应该如下：

```javascript
let mofeiAction = new Action('Mofei');

let conding(language) => {
    mofeiAction.emit({
        channel: 'coding',
        data: `I am sleeping at ${place}`
    })
}

let sleep(palce) => {
    mofeiAction.emit({
        channel: 'coding',
        data: `I am sleeping at ${place}`
    })
}

export {coding, sleep};
```

调用的时候我们需要引入`coding` 或者 `sleep`

```javascript
import {coding, sleep} from 'path';

coding('javascript')
sleep('home')
```

相对比较起来通过def定义的实例方法会自动挂在到Action的全局变量上，你不需要在各个页面中引入具体的方法，只需引入Marine的Action，然后通过 Action[ActionName][functionName] 就可以调用，可以提高不少开发效率。而传统的new Action的方法，你则需要将这些类方法export出去，然后在需要用的地方import进来该方法，可能会稍许麻烦些。


#### 1.2 Action.coustructor(name)
#### 1.3 action.emit(emitParam)

action.emit 用于分发消息，所有监听被分发的频道的事件均能收到分发的消息。

| Param | Type | Explain |
|:---:|:---:|:---:|
|emitParam.channel|[String]|分发的channel的名称|
|emitParam.data|[Object]|分发的data数据|

用法如下

```javascript
Action.def('Mofei', {
    coding: (action, language)=>{
        // emit 方法
        action.emit({
            channel: 'coding',
            data: `I am coding with ${language}`
        })
    }
});

// 触发
Action.Mofei.coding('javascript')
// 此时监听了coding频道的所有对象都能获得消息
// Store.on('Mofei.coding', (data)=>{
//    console.log(data)
//})
```

#### 1.4 action.echo(echoParam)
#### 1.5 action.[emit|echo].reduice(reduiceParam)
#### 1.6 action.[emit|echo].reduice(reduiceParam)
#### 1.7 action.[emit|echo].channel(channelNames) [String|Array]
#### 1.8 action.[emit|echo].stores(storesNames) [Array]


### 2. Store

#### 2.1 Store.on(ChannelName, callback)

#### 2.2 Store() 