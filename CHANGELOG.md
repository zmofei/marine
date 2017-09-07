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