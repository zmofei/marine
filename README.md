# marine
marine is a Store - View model

## Action
```
Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']Ï
        });
    }
});

Action.Home.emittest()
```



## Store

```
Store.on('Home', (datas) => {
    console.log('on Home', datas);
});

Store.on('Home.homechannel', (datas) => {
    console.log('on Home.homechannel', datas);
});

Store.on('Home.homechannel2', (datas) => {
    console.log('on Home.homechannel', datas);
});
```