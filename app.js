var ClumsyBird = module.exports = function() {
  this.name = 'clumsy-bird';
};

var cb = function(){};

ClumsyBird.prototype.init = function(elroy) {
  elroy.observe('type="button"')
  .zip(elroy.observe('type="ardrone"'),elroy.observe('type="huehub"'),elroy.observe('type="smartwatch"'))
  .subscribe(function(devices) {
    var button = devices[0];
    var ardrone = devices[1];
    var hue = devices[2];
    var watch = devices[3];

    var timer = null;
    var count  = 0;
    var duration = ardrone.data.movementTime;

    button.on('press', function() {
//      sphero.call('move', 5, cb);
      hue.call('blink');
      watch.call('sms', 'Pebble', 'Hello world!', cb);

      if(ardrone.state === 'landed'){
	ardrone.call('take-off');
      }else{
	ardrone.call('up');
	count++;

	if(timer !== null)
	  clearTimeout(timer);

	timer = setTimeout(function(){
	  ardrone.call('timed-down',count*duration*0.7,cb);
	  count = 0;
	},duration);	   
      }

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
