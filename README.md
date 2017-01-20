# marine
marine is a Store - Model model

## Action

### Action - Define

```javascript
Action.def('Home', {
    'emittest': (action) => {
        // scripts
    }
});

// After you define the action, it will bind to Action automaticly, you can call the function eaisy
// eg: after define Home, you can use the Home as `Action.Home.emittest`
Action.Home.emittest();
```

### Action - Emit


```javascript
// this will define the Home action 
Action.def('Home', {
    'emittest': (action) => {
        action.emit({
            channel: 'homechannel',
            data: 'test',
            // stores: ['StoreTest', 'StoreTesta', 'StoreTesb']
        });
    }
});
```

## Store

### Store - Define

```javascript
Store.def('Home', {

});
```

### Store - Listen

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

### Store - Unbind

```javascript
var theStore = Store.on((obj) => {
    // other scripts
});

// run the return of the Store will unbind the listen
theStore();
```