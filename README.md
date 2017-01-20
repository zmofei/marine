# marine
marine is a Store - View model


##
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