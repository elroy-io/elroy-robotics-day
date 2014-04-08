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
      elroy.expose(sphero);
      elroy.expose(button);
      elroy.expose(hue);
    });
  });
};
