(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'anglue/anglue'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('anglue/anglue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.anglue);
    global.mdDrawerComponent = mod.exports;
  }
})(this, function (exports, _anglueAnglue) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  exports.MdDrawerComponent = MdDrawerComponent;

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var MdDrawerComponentBehavior = (function (_Behavior) {
    _inherits(MdDrawerComponentBehavior, _Behavior);

    function MdDrawerComponentBehavior() {
      _classCallCheck(this, MdDrawerComponentBehavior);

      _get(Object.getPrototypeOf(MdDrawerComponentBehavior.prototype), 'constructor', this).apply(this, arguments);

      this.drawer = this.instance.$mdSidenav(this.config.drawerId || 'drawer');

      this.open();
    }

    _createClass(MdDrawerComponentBehavior, [{
      key: 'open',
      value: function open() {
        var _this = this;

        this.drawer.open().then(function () {
          _this.instance.$scope.$on('$destroy', _this.onDestroy.bind(_this));
          _this.instance.$scope.$watch(function () {
            return _this.drawer.isOpen();
          }, function (isOpen, wasOpen) {
            if (!isOpen && wasOpen) {
              _this.doCloseRoute();
            }
          });
        });
      }
    }, {
      key: 'close',
      value: function close() {
        this.destroyPromise = this.instance.$q.defer();
        this.doCloseRoute();
        return this.destroyPromise.promise;
      }
    }, {
      key: 'doCloseRoute',
      value: function doCloseRoute() {
        this.instance.$state.go(this.config.closeRoute || '^');
      }
    }, {
      key: 'onDestroy',
      value: function onDestroy() {
        var _this2 = this;

        this.drawer.close().then(function () {
          if (_this2.destroyPromise) {
            _this2.destroyPromise.resolve();
          }
        });
      }
    }]);

    return MdDrawerComponentBehavior;
  })(_anglueAnglue.Behavior);

  exports.MdDrawerComponentBehavior = MdDrawerComponentBehavior;

  function MdDrawerComponent() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (cls) {
      var preparedConfig = Object.assign({}, {
        closeRoute: '^'
      }, config);

      (0, _anglueAnglue.Inject)()(cls.prototype, '$mdSidenav');
      (0, _anglueAnglue.Inject)()(cls.prototype, '$state');
      (0, _anglueAnglue.Inject)()(cls.prototype, '$scope');
      (0, _anglueAnglue.Inject)()(cls.prototype, '$q');

      (0, _anglueAnglue.addBehavior)(cls, MdDrawerComponentBehavior, {
        property: 'mdDrawerComponent',
        config: preparedConfig,
        proxy: ['closeDrawer:close']
      });
    };
  }
});
//# sourceMappingURL=md-drawer-component.js.map
