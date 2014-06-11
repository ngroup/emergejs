/*
 *  EmergeJS 1.0.1
 *  https://github.com/ngroup/emergejs
 *
 *  Copyright (c) 2014 Chun Nien
 *  Released under the MIT license
 */
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function($) {
  $.emerge = {};
  $.fn.emerge = function(method) {
    var methods;
    methods = $.emerge.methods;
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on EmergeJS');
    }
  };
  $.emerge.queue = [];
  $.emerge.options = {
    content: null,
    theme: null,
    lifetime: 2400,
    speedShow: 200,
    speedHide: 200,
    hideOnClick: true,
    eventClick: function() {}
  };
  $.emerge.methods = {
    init: function(options) {
      options = $.extend({}, $.emerge.options, options);
      return this.each(function() {
        var $this;
        $this = $(this);
        $this.emerge('show', options);
        $this.emerge('bindEvent', options);
        if (options.lifetime) {
          setTimeout(function() {
            $this.emerge('hide', options);
          }, options.lifetime);
        }
      });
    },
    show: function(options) {
      options = $.extend({}, $.emerge.options, options);
      return this.each(function() {
        var $this;
        $this = $(this);
        if (options.content) {
          $this.html(options.content);
        }
        if (options.theme) {
          $this.removeClass().addClass(options.theme);
        }
        $this.fadeIn(options.showSpeed);
        if (__indexOf.call($.emerge.queue, this) < 0) {
          $.emerge.queue.push(this);
        }
      });
    },
    hide: function(options) {
      options = $.extend({}, $.emerge.options, options);
      return this.each(function() {
        var $this;
        $this = $(this);
        $this.fadeOut(options.hideSpeed);
        $this.promise().done(function() {
          var thisIdx;
          thisIdx = $.emerge.queue.indexOf(this);
          $.emerge.queue.splice(thisIdx, 1);
        });
      });
    },
    bindEvent: function(options) {
      options = $.extend({}, $.emerge.options, options);
      return this.each(function() {
        var $this;
        $this = $(this);
        if (options.hideOnClick) {
          options.eventClick = function() {
            return this.hide();
          };
        }
        $this.click(function() {
          return options.eventClick.apply($this);
        });
      });
    }
  };
  $.emerge.addMethods = function(newMethods) {
    $.emerge.methods = $.extend($.emerge.methods, newMethods);
  };
})(jQuery);
