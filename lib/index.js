'use strict';

var marineAction = require('./marineAction');
var marineStore = require('./marineStore');
var sys = require('./sys');

var Marine = {};
Marine.Action = marineAction(Marine);
Marine.Store = marineStore(Marine);
sys.basic = {
    action: Marine.Action,
    store: Marine.Store
};

module.exports = Marine;