var ClumsyBird = module.exports = function() {
  this.name = 'clumsy-bird';
};

var cb = function(){};

ClumsyBird.prototype.init = function(elroy) {
  elroy.observe('type="button"')
  .zip(elroy.observe('type="sphero"'),elroy.observe('type="huehub"'),elroy.observe('type="smartwatch"'))
  .subscribe(function(devices) {
    var button = devices[0];
    var sphero = devices[1];
    var hue = devices[2];
    var watch = devices[3];

    button.on('press', function() {
      sphero.call('move', 5, cb);
      hue.call('blink');
      watch.call('sms', 'Pebble', 'Hello world!', cb);
    });
  });


  elroy
     .observe('type="huebulb"')
     .zip(elroy.observe('type="photosensor"'))
     .subscribe(function(devices){
       var bulb = devices[0];
       var sensor = devices[1];

       bulb.call('turn-off');
       sensor.on('update',function(val){
	 if(val < 900 && bulb.state !== 'off'){
	   bulb.call('turn-off');
	 }else if(val > 900 && bulb.state !== 'on'){
	   bulb.call('turn-on');
	 }
       });
     });


  elroy.on('deviceready',function(device){
    elroy.expose(device);
  });

};
