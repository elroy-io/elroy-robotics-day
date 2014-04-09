var ArduinoFirmata = require('arduino-firmata');
var throttleEvent = require('throttle-event');

var ButtonDriver = module.exports = function() {
  this.type = 'button';
  this.name = 'button';
  this.state = 'up';
  this._pressEmitter = null;

  this._board = new ArduinoFirmata();
  this._board.connect('/dev/tty.usbmodem1411');
  
  var self = this;
  this._board.on('connect', function() {
    console.log('connected');
    self._board.pinMode(2, ArduinoFirmata.INPUT);
    self._board.on('digitalChange', throttleEvent(20,function(e) {
      if (!self._pressEmitter || e.pin !== 2) {
        return;
      }

      if (e.value === true) {
        self.call('press');
      } else if (e.value === false) {
        self.call('lift');
      }
    }));
  });
};

ButtonDriver.prototype.init = function(config) {
  config
    .when('down', { allow: ['lift', 'click'] })
    .when('up', { allow: ['press', 'click'] })
    .map('press', this.press)
    .map('lift', this.lift)
    .map('click', this.click)
    .stream('pressing', this.onPress);
};

ButtonDriver.prototype.lift = function(cb) {
  this.state = 'up';
  cb();
};

ButtonDriver.prototype.press = function(cb) {
  this.state = 'down';

  if (this._pressEmitter) {

    this._pressEmitter.emit('data', 1);
  }

  cb();
};

ButtonDriver.prototype.click = function(cb) {
  var self = this;
  this.press(function() {
    self.lift(cb);
  });
};

ButtonDriver.prototype.onPress = function(emitter) {
  this._pressEmitter = emitter;
};
