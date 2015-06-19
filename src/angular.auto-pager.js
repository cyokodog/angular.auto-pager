(function() {
  var Controller;

  Controller = (function() {
    function Controller() {}

    Controller.prototype.init = function(scope, el, attr) {
      var c;
      c = this.config = {
        scope: scope,
        el: el,
        attr: attr
      };
      c.ms = c.scope.autoPagerMs || 300;
      return this.bindEvent();
    };

    Controller.prototype.bindEvent = function() {
      var c, o, win;
      o = this;
      c = o.config;
      win = angular.element(window);
      if (Controller.scroll) {
        win.off('scroll', Controller.scroll);
      }
      Controller.scroll = function(evt) {
        if (o.getDocumentHeigh() - window.innerHeight - c.ms < o.getScrollTop()) {
          return c.el[0].click();
        }
      };
      return win.on('scroll', Controller.scroll);
    };

    Controller.prototype.getScrollTop = function() {
      return document.body.scrollTop || document.documentElement.scrollTop;
    };

    Controller.prototype.getDocumentHeigh = function() {
      return document.body.scrollHeight || document.documentElement.scrollHeight;
    };

    return Controller;

  })();

  angular.module('autoPager', []).directive('autoPager', function() {
    return {
      scope: {
        autoPagerMs: '@'
      },
      restrict: 'A',
      link: function(scope, el, attr, ctrl) {
        return ctrl.init(scope, el, attr);
      },
      controller: Controller
    };
  });

}).call(this);
