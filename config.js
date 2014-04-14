var HueScout = require('zetta-hue-driver');
var PebbleScout = require('zetta-pebble-driver');
var PhotosensorScout = require('zetta-zigbee-photosensor-driver');
var ArdroneScout = require('zetta-ardrone-driver')
var GlassScout = require('zetta-glass-driver');

module.exports = function(runtime) {
  runtime.scouts.push(HueScout);
  runtime.scouts.push(PebbleScout);
  runtime.scouts.push(PhotosensorScout);
  runtime.scouts.push(ArdroneScout);
  runtime.scouts.push(GlassScout);
};

