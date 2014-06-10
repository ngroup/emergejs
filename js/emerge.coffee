###
#  EmergeJS 1.0
#  https://github.com/ngroup/emergejs
#
#  Copyright (c) 2014 Chun Nien
#  Released under the MIT license
###

# Reference jQuery
$ = jQuery

$.fn.extend
  emerge: (options) ->
    # Default settings
    settings =
      content: null             # string, content to display in HTML format
      theme: null               # string, classes to apply
      lifetime: 2400
      speedShow: 200
      speedHide: 200
      hideOnClick: true
      eventClick: ->

    # Merge default settings with options.
    settings = $.extend settings, options

    return @each ->
      $this = $(this)
      if settings.content
        $this.html(settings.content)
      if settings.theme
        $this.removeClass().addClass(settings.theme)
      $this.fadeIn(settings.showSpeed)
      if settings.hideOnClick
        settings.eventClick = ->
          this.hide()
      $this.click ->
        settings.eventClick.apply($this)
      if settings.lifetime
        $this.delay(settings.lifetime).fadeOut(settings.hideSpeed)
