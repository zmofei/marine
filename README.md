# marine
marine is a Store - View model

## Action

### Define

```javascript
Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        });
    }
});

Action.Home.emittest()
```



## Store

### Define

```javascript
Store.def('Home', {

});
```

### Listen

the Store return a object, which incloud the `store`, `channel` and `data`

```javascript
Store.on((obj) => {
    // It will liesten everything
    console.log('on', obj);
});

Store.on('Home', (obj) => {
    // Listen for events from Home event
    console.log('on Home', obj);
});

Store.on('Home.channel', (obj) => {
    // Only listen for events from channel in Home
    console.log('on Home.channel', obj);
});
```