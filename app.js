var ClumsyBird = module.exports = function() {
  this.name = 'clumsy-bird';
};

var cb = function(){};

ClumsyBird.prototype.init = function(zetta) {
  zetta.observe('type="button"')
  .zip(zetta.observe('type="ardrone"')
      ,zetta.observe('type="huehub"')
      ,zetta.observe('type="smartwatch"'))
  .subscribe(function(devices) {
    
    console.log('Devices Ready')
    
    var button = devices[0];
    var ardrone = devices[1];
    var hue = devices[2];
    var watch = devices[3];
    
    // ardrone climb
    var droneLift = new ArDroneLift(ardrone);
    
    button.on('press', function() {
      hue.call('blink');
      watch.call('sms', 'Pebble', 'Hello potato!', cb);
//      droneLift.goUp();
    });
  });




  zetta
    .observe('type="huebulb"')
    .zip(zetta.observe('type="photosensor"'))
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




  zetta.on('deviceready',function(device){
    zetta.expose(device);
  });

};



function ArDroneLift(ardrone){
  this.timer = null;
  this.count  = 0;
  this.duration = ardrone.data.movementTime;
  this.ardrone = ardrone;
};

ArDroneLift.prototype.goUp = function(){
  var self = this;
  if(this.ardrone.state === 'landed'){
    this.ardrone.call('take-off');
  }else{
    this.ardrone.call('up');
    self.count++;

    if(this.timer !== null)
      clearTimeout(this.timer);

    this.timer = setTimeout(function(){
      self.ardrone.call('timed-down',self.count*self.duration*0.7,cb);
      self.count = 0;
    },self.duration); 
  }
};


process.on('uncaughtException',function(err){
  console.log('oops:',err);
});
