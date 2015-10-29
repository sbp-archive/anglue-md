import {
  addBehavior,
  Behavior,
  Inject as injectDecorator
} from 'anglue/anglue';

import angular from 'angular';

export class MdResponsiveComponentBehavior extends Behavior {
  constructor() {
    super(...arguments);

    // Setup watcher to recheck layout on resize
    this.instance.$scope.$watch(this.determineDeviceType.bind(this), deviceType => {
      if (angular.isFunction(this.instance.deviceTypeChanged)) {
        this.instance.deviceTypeChanged(deviceType);
      }

      this.deviceType = deviceType;
    });
  }

  determineDeviceType() {
    if (this.instance.$mdMedia(`max-width: ${this.config.mobileBreakpoint}px`)) {
      return 'mobile';
    } else if (this.instance.$mdMedia(`${this.config.tabletBreakpoint}`)) {
      return 'tablet';
    }
    return 'desktop';
  }

  get deviceType() {
    return this._deviceType;
  }

  set deviceType(deviceType) {
    this.isMobile = deviceType === 'mobile';
    this.isTablet = deviceType === 'tablet';
    this.isDesktop = deviceType === 'desktop';

    this._deviceType = deviceType;
  }
}

export function MdResponsiveComponent(config = {}) {
  return cls => {
    const preparedConfig = Object.assign({}, {
      mobileBreakpoint: 960,
      tabletBreakpoint: 'lg',
      desktopBreakpoint: 'gt-lg'
    }, config);

    injectDecorator()(cls.prototype, '$mdMedia');
    injectDecorator()(cls.prototype, '$scope');

    addBehavior(cls, MdResponsiveComponentBehavior, {
      property: 'mdResponsiveComponent',
      config: preparedConfig,
      proxy: ['isMobile', 'isTablet', 'isDesktop', 'deviceType']
    });
  };
}
