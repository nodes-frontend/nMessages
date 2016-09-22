namespace component {
    'use strict';

    interface InMessageDirectiveScope {
        message: any
    }

    class NMessagesMessageDirective implements ng.IDirective {
        static $inject: Array<string> = [];
        constructor() {}

        static instance(): ng.IDirective {
            return new NMessagesMessageDirective();
        }

        bindToController: boolean = true;
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: NMessagesMessageDirectiveController) => void = this.linkFn;
        controller: NMessagesMessageDirectiveController = NMessagesMessageDirectiveController;
        restrict: string = 'EA';
        templateUrl: string = 'src/nMessages.message.template.html';
        controllerAs: string = 'ctrl';
        scope: InMessageDirectiveScope = {
            message: '=nMessagesMessage'
        };

        private linkFn(scope: any, element: any, attrs: any, ctrl: NMessagesMessageDirectiveController) {

            if (ctrl.message.dismissOnTimeout) {
                ctrl.$timeout(function () {
                    ctrl.dismiss(ctrl.message.id);
                }, ctrl.message.timeout);
            }
            if (ctrl.message.dismissOnClick) {
                element.bind('click', () => {
                    ctrl.dismiss(ctrl.message.id);
                    scope.$apply();
                    scope.$destroy();
                })
            }

        }
    }

    class NMessagesMessageDirectiveController {
        message: any;

        static $inject: Array<string> = ['$timeout', 'nMessages'];
        constructor(public $timeout: ng.ITimeoutService,
                    private nMessages: any) {
        }

        dismiss(messageId) {
            this.nMessages.dismiss(messageId);
        }
    }

    angular
        .module('component')
        .directive('nMessagesMessage', NMessagesMessageDirective.instance);
}