import {
  addBehavior,
  Behavior,
  Inject as injectDecorator
} from 'anglue/anglue';

export class MdDrawerComponentBehavior extends Behavior {
  constructor() {
    super(...arguments);

    this.drawer = this.instance.$mdSidenav(this.config.drawerId || 'drawer');

    this.open();
  }

  open() {
    this.drawer.open().then(() => {
      this.instance.$scope.$on('$destroy', this.onDestroy.bind(this));
      this.instance.$scope.$watch(() => this.drawer.isOpen(), (isOpen, wasOpen) => {
        if (!isOpen && wasOpen) {
          this.doCloseRoute();
        }
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
    });
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
