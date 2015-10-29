(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'anglue/anglue', 'angular'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('anglue/anglue'), require('angular'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.anglue, global.angular);
    global.mdResponsiveComponent = mod.exports;
  }
})(this, function (exports, _anglueAnglue, _angular) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  exports.MdResponsiveComponent = MdResponsiveComponent;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var _angular2 = _interopRequireDefault(_angular);

  var MdResponsiveComponentBehavior = (function (_Behavior) {
    _inherits(MdResponsiveComponentBehavior, _Behavior);

    function MdResponsiveComponentBehavior() {
      var _this = this;

      _classCallCheck(this, MdResponsiveComponentBehavior);

      _get(Object.getPrototypeOf(MdResponsiveComponentBehavior.prototype), 'constructor', this).apply(this, arguments);

      // Setup watcher to recheck layout on resize
      this.instance.$scope.$watch(this.determineDeviceType.bind(this), function (deviceType) {
        if (_angular2['default'].isFunction(_this.instance.deviceTypeChanged)) {
          _this.instance.deviceTypeChanged(deviceType);
        }

        _this.deviceType = deviceType;
      });
    }

    _createClass(MdResponsiveComponentBehavior, [{
      key: 'determineDeviceType',
      value: function determineDeviceType() {
        if (this.instance.$mdMedia('max-width: ' + this.config.mobileBreakpoint + 'px')) {
          return 'mobile';
        } else if (this.instance.$mdMedia('' + this.config.tabletBreakpoint)) {
          return 'tablet';
        }
        return 'desktop';
      }
    }, {
      key: 'deviceType',
      get: function get() {
        return this._deviceType;
      },
      set: function set(deviceType) {
        this.isMobile = deviceType === 'mobile';
        this.isTablet = deviceType === 'tablet';
        this.isDesktop = deviceType === 'desktop';

        this._deviceType = deviceType;
      }
    }]);

    return MdResponsiveComponentBehavior;
  })(_anglueAnglue.Behavior);

  exports.MdResponsiveComponentBehavior = MdResponsiveComponentBehavior;

  function MdResponsiveComponent() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (cls) {
      var preparedConfig = Object.assign({}, {
        mobileBreakpoint: 960,
        tabletBreakpoint: 'lg',
        desktopBreakpoint: 'gt-lg'
      }, config);

      (0, _anglueAnglue.Inject)()(cls.prototype, '$mdMedia');
      (0, _anglueAnglue.Inject)()(cls.prototype, '$scope');

      (0, _anglueAnglue.addBehavior)(cls, MdResponsiveComponentBehavior, {
        property: 'mdResponsiveComponent',
        config: preparedConfig,
        proxy: ['isMobile', 'isTablet', 'isDesktop', 'deviceType']
      });
    };
  }
});
//# sourceMappingURL=md-responsive-component.js.map
