var Key = {
  _pressed: {},
  _pressedcheckOnce:{},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,

  isPressed: function(keyCode){
    if (this._pressedcheckOnce[keyCode]){
      var obj = JSON.parse(JSON.stringify(this._pressedcheckOnce[keyCode]));
      this._pressedcheckOnce[keyCode] = 0;
      return obj;
    }
  },
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = new Date().getTime();
    this._pressedcheckOnce[event.keyCode] = new Date().getTime();
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);