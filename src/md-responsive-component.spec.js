/*eslint-env node, jasmine*//*global module*/
/*eslint-disable max-statements, max-params*/
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-material-mocks';
import 'angular-mocks';
import 'angular-ui-router';

import {
  Annotations,
  Component
} from 'anglue/anglue';

import {buildComponent, buildModuleForComponent, registerModule, injectComponentUsingModule} from 'anglue/test-helpers';

import {
  MdResponsiveComponent
} from 'anglue-md/anglue-md';

describe('MdResponsiveComponent', () => {


  describe('@MdResponsiveComponent() decorator', () => {
    let controller;

    // Clear the AnnotationCache for unit tests to ensure we create new annotations for each class.
    beforeEach(() => {
      Annotations.clear();

      @Component()
      @MdResponsiveComponent()
      class ResponsiveTestComponent {}

      controller = buildComponent(ResponsiveTestComponent, '', ['ngMaterial', 'ngMaterial-mock', 'ui.router']);
    });

    it('should add behaviour to the component', () => {
      expect(controller.mdResponsiveComponent).toBeDefined();
    });

    it('should add getDeviceType getter', () => {
      expect(controller.deviceType).toBeDefined();
    });

    it('should add isMobile property', () => {
      expect(controller.isMobile).toBeDefined();
    });

    it('should add isTablet property', () => {
      expect(controller.isTablet).toBeDefined();
    });

    it('should add isDesktop property', () => {
      expect(controller.isDesktop).toBeDefined();
    });

    it('deviceTypeChanged should get called', () => {
      controller.rootDigest();

    });
  });

  describe('Mocking out $mdMedia', () => {
    it('it should update isMobile, isTable, isDesktop when resizing and call deviceTypeChanged', () => {
      @Component()
      @MdResponsiveComponent()
      class ResponsiveTestComponent {}

      const module = buildModuleForComponent(ResponsiveTestComponent, ['ngMaterial', 'ngMaterial-mock', 'ui.router']);

      let expectedDeviceType;

      module.service('$mdMedia', () => {
        return query => {
          if (query === 'max-width: 960px' && expectedDeviceType === 'mobile') {
            return true;
          } else if (query === 'lg' && expectedDeviceType === 'tablet') {
            return true;
          }

          return false;
        };
      });

      registerModule(module.name);

      const controller = injectComponentUsingModule(module.name, ResponsiveTestComponent, '');
      controller.deviceTypeChanged = () => {};
      spyOn(controller, 'deviceTypeChanged');

      expectedDeviceType = 'mobile';
      controller.rootDigest();
      expect(controller.isMobile).toBe(true);

      expectedDeviceType = 'tablet';
      controller.rootDigest();
      expect(controller.isTablet).toBe(true);

      expectedDeviceType = 'desktop';
      controller.rootDigest();
      expect(controller.isDesktop).toBe(true);

      expect(controller.deviceTypeChanged).toHaveBeenCalled();
    });
  });
});
