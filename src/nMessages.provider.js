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
			console.log(this)

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
