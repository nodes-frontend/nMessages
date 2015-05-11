/**
 * 
 * @version v1.0.0 - 2015-05-11
 * @link 
 * @author 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular
		.module('nCore.nMessages.message', ['nCore.nMessages.provider'])
		.directive('nMessagesMessage', message);

	/* @ngInject */
	function message(nMessages, $timeout) {

		var directive = {
			restrict: 'EA',
			transclude: true,
			templateUrl: 'src/nMessages.message.template.html',
			scope: {
				message: '=nMessagesMessage'
			},
			link: link,
			controller: controller
		};
		return directive;

		function link(scope, element) {
			if (scope.message.dismissOnTimeout) {
				$timeout(function () {
					nMessages.dismiss(scope.message.id);
				}, scope.message.timeout);
			}

			if (scope.message.dismissOnClick) {
				element.bind('click', function () {
					nMessages.dismiss(scope.message.id);
					scope.$apply();
				});
			}
		}

		function controller($scope, nMessages) {
			$scope.dismiss = function () {
				nMessages.dismiss($scope.message.id);
			};
		}

	}
	message.$inject = ["nMessages", "$timeout"];

})();

(function () {
	'use strict';

	angular.module('nCore.nMessages', [
		'ngSanitize',
		'ngAnimate',
		'nCore.nMessages.provider',
		'nCore.nMessages.wrapper',
		'nCore.nMessages.message'
	]);

})();

(function () {
	'use strict';

	angular
		.module('nCore.nMessages.provider', [])
		.provider('nMessages', messagesProvider);

	function messagesProvider() {
		var messages = [],
			messageStack = [];

		var defaults = {
			type: 'success',
			dismissOnTimeout: true,
			timeout: 4000,
			dismissButton: false,
			dismissButtonHtml: '&times;',
			dismissOnClick: true,
			horizontalPosition: 'center',
			verticalPosition: 'top',
			maxNumber: 0
		};

		function Message(msg) {

			var id = Math.floor(Math.random()*1000);

			while (messages.indexOf(id) > -1) {
				id = Math.floor(Math.random()*1000);
			}

			this.id = id;
			this.type = defaults.type;
			this.dismissOnTimeout = defaults.dismissOnTimeout;
			this.timeout = defaults.timeout;
			this.dismissButton = defaults.dismissButton;
			this.dismissButtonHtml = defaults.dismissButtonHtml;
			this.dismissOnClick = defaults.dismissOnClick;

			angular.extend(this, msg);

		}

		this.configure = function(config) {
			angular.extend(defaults, config);
		};

		this.$get = [function() {
			return {
				settings: defaults,
				messages: messages,
				dismiss: function(id) {
					if (id) {

						for (var i = messages.length - 1; i >= 0; i--) {
							if (messages[i].id === id) {
								messages.splice(i, 1);
								messageStack.splice(messageStack.indexOf(id), 1);
								return;
							}
						}

					} else {

						while(messages.length > 0) {
							messages.pop();
						}

						messageStack = [];
					}
				},
				create: function(msg) {

					if (defaults.maxNumber > 0 &&
						messageStack.length >= defaults.maxNumber) {
						this.dismiss(messageStack[0]);
					}

					msg = (typeof msg === 'string') ? {content: msg} : msg;

					var newMsg = new Message(msg);

					if(defaults.verticalPosition === 'bottom') {
						messages.unshift(newMsg);
					} else {
						messages.push(newMsg);
					}

					messageStack.push(newMsg.id);

					return newMsg.id;
				}
			};
		}];
	}

})();

(function () {
	'use strict';

	angular
		.module('nCore.nMessages.wrapper', ['nCore.nMessages.provider'])
		.directive('nMessagesWrapper', wrapper);

	/* @ngInject */
	function wrapper(nMessages) {

		var directive = {
			restrict: 'EA',
			replace: true,
			compile: compile,
			templateUrl: 'src/nMessages.wrapper.template.html'
		};
		return directive;

		function compile(tElem, tAttrs) {

			return function(scope) {
				// pænere end ..Pos!
				scope.hPos = nMessages.settings.horizontalPosition;
				scope.vPos = nMessages.settings.verticalPosition;

				scope.messages = nMessages.messages;
			};
		}

	}
	wrapper.$inject = ["nMessages"];

})();

angular.module('nCore.nMessages').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('nMessages.message.template.html',
    "<div class=\"nodes-messages__message {{message.type}}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t<a class=\"nodes-messages__close-button\" ng-if=\"message.dismissButton\" ng-bind-html=\"message.dismissButtonHtml\" ng-click=\"!message.dismissOnClick && dismis()\"></a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t<span class=\"nodes-messages__content\" ng-transclude=\"\"></span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nMessages.wrapper.template.html',
    "<div class=\"nodes-messages nodes-messages--{{hPos}}-{{vPos}}\">\r" +
    "\n" +
    "\t<ul class=\"nodes-messages__list\">\r" +
    "\n" +
    "\t\t<li ng-repeat=\"message in messages track by $index\" n-messages-message=\"message\">\r" +
    "\n" +
    "\t\t\t<span ng-bind-html=\"message.content\"></span>\r" +
    "\n" +
    "\t\t</li>\r" +
    "\n" +
    "\t</ul>\r" +
    "\n" +
    "</div>"
  );

}]);
