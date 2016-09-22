namespace component {
    'use strict';

    class NMessagesWrapperDirective implements ng.IDirective {

        constructor() {}

        static instance(): ng.IDirective {
            return new NMessagesWrapperDirective();
        }

        restrict: string = 'EA';
        controller: NMessagesWrapperController = NMessagesWrapperController;
        replace: boolean = true;
        templateUrl: string = 'src/nMessages.wrapper.template.html';
        controllerAs: string = 'wrapper';
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: NMessagesWrapperController) => void = this.linkFn;

        private linkFn(scope: any, element: any, attrs: any, ctrl: NMessagesWrapperController) {

            scope.hPos = ctrl.getSettings().horizontalPosition;
            scope.vPos = ctrl.getSettings().verticalPosition;
            scope.messages = ctrl.getMessages();
        }
    }

    class NMessagesWrapperController {
        static $inject: Array<string> = ['nMessages'];

        constructor(private nMessages: any) {
        }

        getSettings() {
            return this.nMessages.settings;
        }

        getMessages() {
            return this.nMessages.messages;
        }
    }

    angular
        .module('component')
        .directive('nMessagesWrapper', NMessagesWrapperDirective.instance);
}