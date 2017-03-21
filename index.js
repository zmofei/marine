var marineAction = require('./src/marineAction');
var marineStore = require('./src/marineStore');
var sys = require('./src/sys');

var Marine = {}
Marine.Action = marineAction(Marine);
Marine.Store = marineStore(Marine);
sys.basic = {
    action: Marine.Action,
    store: Marine.Store
}

module.exports = Marine;