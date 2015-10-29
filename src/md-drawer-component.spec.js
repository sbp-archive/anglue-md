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

import {buildComponent} from 'anglue/test-helpers';

import {
  MdDrawerComponent
} from 'anglue-md/anglue-md';

describe('MdDrawerComponent', () => {
  // Clear the AnnotationCache for unit tests to ensure we create new annotations for each class.
  beforeEach(() => {
    Annotations.clear();
  });

  describe('@MdDrawerComponent() decorator', () => {
    @Component() @MdDrawerComponent()
    class DrawerTestComponent {
    }

    it('should add behaviour to the component', () => {
      const controller = buildComponent(DrawerTestComponent, '', ['ngMaterial', 'ngMaterial-mock', 'ui.router']);
      expect(controller.mdDrawerComponent).toBeDefined();
    });
  });
});
