/*
 *  EmergeJS 1.0
 *  https://github.com/ngroup/emergejs
 *
 *  Copyright (c) 2014 Chun Nien
 *  Released under the MIT license
 */

(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    emerge: function(options) {
      var settings;
      settings = {
        content: null,
        theme: null,
        lifetime: 2400,
        speedShow: 200,
        speedHide: 200,
        hideOnClick: true,
        eventClick: function() {}
      };
      settings = $.extend(settings, options);
      return this.each(function() {
        var $this;
        $this = $(this);
        if (settings.content) {
          $this.html(settings.content);
        }
        if (settings.theme) {
          $this.removeClass().addClass(settings.theme);
        }
        $this.fadeIn(settings.showSpeed);
        if (settings.hideOnClick) {
          settings.eventClick = function() {
            return this.hide();
          };
        }
        $this.click(function() {
          return settings.eventClick.apply($this);
        });
        if (settings.lifetime) {
          return $this.delay(settings.lifetime).fadeOut(settings.hideSpeed);
        }
      });
    }
  });

}).call(this);
