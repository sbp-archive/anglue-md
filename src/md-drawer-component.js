import angular from 'angular';

import {
  addBehavior,
  camelCaseToDashes,
  Behavior,
  Inject as injectDecorator
} from 'anglue/anglue';

export class MdDrawerComponentBehavior extends Behavior {
  constructor() {
    super(...arguments);

    this.drawerId = this.config.drawerId || 'drawer';
    this.drawerCls = this.config.drawerCls;

    if (!this.drawerCls) {
      const dashName = camelCaseToDashes(this.instance.constructor.annotation.name).toLowerCase();
      this.drawerCls = `drawer-${dashName}`;
    }

    this.drawer = this.instance.$mdSidenav(this.drawerId);
    this.open();
  }

  get drawerEl() {
    return angular.element(document.querySelector(`[md-component-id=${this.drawerId}]`));
  }

  open() {
    this.drawer.then(() => {
      this.addDrawerCls();
      this.drawer.open().then(() => {
        this.instance.$scope.$on('$destroy', this.onDestroy.bind(this));
        this.instance.$scope.$watch(() => this.drawer.isOpen(), (isOpen, wasOpen) => {
          if (!isOpen && wasOpen) {
            this.doCloseRoute();
          }
        });
      });
    });
  }

  close() {
    this.destroyPromise = this.instance.$q.defer();
    this.doCloseRoute();
    return this.destroyPromise.promise;
  }

  doCloseRoute() {
    this.instance.$state.go(this.config.closeRoute || '^');
  }

  onDestroy() {
    this.drawer.close().then(() => {
      if (this.destroyPromise) {
        this.destroyPromise.resolve();
      }
      this.removeDrawerCls();
    });
  }

  addDrawerCls() {
    this.drawerEl.addClass(this.drawerCls);
  }

  removeDrawerCls() {
    this.drawerEl.removeClass(this.drawerCls);
  }
}

export function MdDrawerComponent(config = {}) {
  return cls => {
    const preparedConfig = Object.assign({}, {
      closeRoute: '^'
    }, config);

    injectDecorator()(cls.prototype, '$mdSidenav');
    injectDecorator()(cls.prototype, '$state');
    injectDecorator()(cls.prototype, '$scope');
    injectDecorator()(cls.prototype, '$q');

    addBehavior(cls, MdDrawerComponentBehavior, {
      property: 'mdDrawerComponent',
      config: preparedConfig,
      proxy: ['closeDrawer:close']
    });
  };
}
