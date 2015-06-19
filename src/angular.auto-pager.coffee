class Controller
  constructor: ->

  init: (scope, el, attr)->
    c = @config = 
      scope: scope,
      el: el,
      attr: attr

    c.ms = c.scope.autoPagerMs || 300
    @bindEvent();

  bindEvent: ->
    o = @
    c = o.config
    win = angular.element window
    if Controller.scroll
      win.off 'scroll',Controller.scroll  
    Controller.scroll = (evt) ->
      if o.getDocumentHeigh() - window.innerHeight - c.ms < o.getScrollTop()
        c.el[0].click()
    win.on 'scroll',Controller.scroll

  getScrollTop: ->
    document.body.scrollTop || document.documentElement.scrollTop

  getDocumentHeigh: ->
    document.body.scrollHeight || document.documentElement.scrollHeight


angular.module 'autoPager',[]
  .directive 'autoPager', ->
    scope: 
      autoPagerMs: '@'
    restrict: 'A'
    link: (scope, el, attr, ctrl)->
      ctrl.init scope, el, attr
    controller: Controller
