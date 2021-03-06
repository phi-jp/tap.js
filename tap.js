/* 
 * tap.js 0.1.0
 * tap.js is a javascript library.
 * MIT Licensed
 * 
 * Copyright (C) 2015 phi, https://github.com/phi-jp/tap.js
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
    window.addEventListener('mouseup', tap._run);
    window.addEventListener('touchend', tap._run);
  };

  tap.disable = function() {
    window.removeEventListener('mouseup', tap._run);
    window.removeEventListener('touchend', tap._run);
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

    var p = (e.type === 'touchend') ? e.changedTouches[0] : e;
    elm.style.left = (p.clientX-size/2)+'px';
    elm.style.top = (p.clientY-size/2)+'px';
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

