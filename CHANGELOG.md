## 2017年09月07日

### 1. 支持action.emit(channel, data, options)语法糖

```javascript
action.emit('coding', `I am coding with ${language}`)
```

等同于

```javascript
action.emit({
    channel: 'coding',
    data: `I am coding with ${language}`
})
```

PS: **快捷方式**，可以在View中直接通过 Action.ActionName.emit() 进行简单的指令发送

```javascript
Action.Mofei.emit('coding','javascript')
```