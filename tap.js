/*
 * tap.js
 */


;(function(ns) {

  var vender = function(elm, key, value) {
    var s = elm.style;
    var upperKey = key.charAt(0).toUpperCase() + key.slice(1);
    s[key] = s['webkit' + upperKey] = s['moz' + upperKey] = value;
  };
  
  var tap = function() {
    tap.enable();
  };

  tap.enable = function() {
    window.addEventListener('mousedown', tap._run);
    window.addEventListener('ontouchstart', tap._run);
  };

  tap.disable = function() {
    window.removeEventListener('mousedown', tap._run);
    window.removeEventListener('ontouchstart', tap._run);
  };

  tap._run = function(e) {
    var elm = document.createElement('div');
    document.body.appendChild(elm);
    
    var size = (tap.options.radius*2);

    elm.style.backgroundColor = tap.options.color;
    elm.style.position = 'fixed';
    elm.style.borderRadius = '50%';
    elm.style.width = size + 'px';
    elm.style.height = size + 'px';
    elm.style.left = (e.clientX-size/2)+'px';
    elm.style.top = (e.clientY-size/2)+'px';
    elm.style.zIndex = '9999';
    vender(elm, 'transition', tap.options.duration + 'ms');
  
    elm.addEventListener('webkitTransitionEnd', function() {
      elm.remove();
    }, false);
    
    setTimeout(function() {
      vender(elm, 'transform', 'scale(2, 2)');
      elm.style.opacity = '0';
    }, 10);
    
  };
  
  tap.options = {
    color: '#aaa',
    radius: 10,
    duration: 500,
  };
  
  ns.tap = tap;

})(window);

