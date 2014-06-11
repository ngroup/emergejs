###
#  EmergeJS 1.0.1
#  https://github.com/ngroup/emergejs
#
#  Copyright (c) 2014 Chun Nien
#  Released under the MIT license
###

# a closure
do ($ = jQuery) ->

  $.emerge = {}

  $.fn.emerge = (method) ->
      methods = $.emerge.methods
      ## Method calling logic
      if methods[method]
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
      else if (typeof method is 'object' or not method)
        return methods.init.apply(this, arguments)
      else
        $.error( 'Method ' +  method + ' does not exist on EmergeJS' )
        return

  $.emerge.queue = []

  # the default options
  $.emerge.options =
    content: null             # string, content to display in HTML format
    theme: null               # string, classes to apply
    lifetime: 2400
    speedShow: 200
    speedHide: 200
    hideOnClick: true
    eventClick: ->

  $.emerge.methods =
    init: (options) ->
      options = $.extend {}, $.emerge.options, options
      return @each ->
        $this = $(@)
        $this.emerge('show', options)
        $this.emerge('bindEvent', options)
        if options.lifetime
          setTimeout( ->
            $this.emerge('hide', options)
            return
          ,options.lifetime)
        return

    show: (options) ->
      options = $.extend {}, $.emerge.options, options
      return @each ->
        $this = $(this)
        if options.content
          $this.html(options.content)
        if options.theme
          $this.removeClass().addClass(options.theme)
        $this.fadeIn(options.showSpeed)
        if this not in $.emerge.queue
          $.emerge.queue.push this
        return

    hide: (options) ->
      options = $.extend {}, $.emerge.options, options
      return @each ->
        $this = $(this)
        $this.fadeOut(options.hideSpeed)
        $this.promise().done ->
          thisIdx = $.emerge.queue.indexOf(this)
          $.emerge.queue.splice(thisIdx, 1)
          return
        return

    bindEvent: (options) ->
      options = $.extend {}, $.emerge.options, options
      return @each ->
        $this = $(this)
        if options.hideOnClick
          options.eventClick = ->
            this.hide()
        $this.click ->
          options.eventClick.apply($this)
        return

  $.emerge.addMethods = (newMethods) ->
      $.emerge.methods = $.extend $.emerge.methods, newMethods
      return

  return
