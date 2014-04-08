var SpheroScout = require('../elroy-sphero-driver');
var HueScout = require('elroy-hue-driver');
var PebbleScout = require('elroy-pebble-driver');

module.exports = function(runtime) {
  runtime.scouts.push(SpheroScout);
  runtime.scouts.push(HueScout);
  runtime.scouts.push(PebbleScout);
};

