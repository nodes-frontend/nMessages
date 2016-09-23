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

            scope.hPos = ctrl.nMessages.settings.horizontalPosition;
            scope.vPos = ctrl.nMessages.settings.verticalPosition;
            scope.messages = ctrl.nMessages.messages;//.getMessages();
        }
    }

    class NMessagesWrapperController {
        static $inject: Array<string> = ['nMessages'];

        constructor(public nMessages: any) {
        }

        getSettings() {
            return this.nMessages.settings;
        }

        getMessages() {
            return this.nMessages.messages;
        }
    }

    angular
        .module('nMessages')
        .directive('nMessagesWrapper', NMessagesWrapperDirective.instance);
}