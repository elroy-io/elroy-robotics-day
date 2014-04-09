var SpheroScout = require('elroy-sphero-driver');
var HueScout = require('elroy-hue-driver');
var PebbleScout = require('elroy-pebble-driver');
var PhotosensorScout = require('elroy-zigbee-photosensor-driver');
var ArdroneScout = require('elroy-ardrone-driver')
var GlassScout = require('elroy-glass-driver');

module.exports = function(runtime) {
//  runtime.scouts.push(SpheroScout);
  runtime.scouts.push(HueScout);
  runtime.scouts.push(PebbleScout);
  runtime.scouts.push(PhotosensorScout);
  runtime.scouts.push(ArdroneScout);
  runtime.scouts.push(GlassScout);
};

