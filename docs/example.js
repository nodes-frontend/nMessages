(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'nMessages'
	]);
	
	angular
		.module('demoApp')
		.controller('demoController', function(nMessages, $timeout) {
			var vm = this;
			
			nMessages.configure({
				verticalPosition: 'top',
				horizontalPosition: 'right'
			});
			
			vm.createBasicMessage = createBasicMessage;
			vm.createAdvancedMessage = createAdvancedMessage;
			
			function _getRandomMessage() {
				return vm.messageContents[Math.floor(Math.random() * vm.messageContents.length)];
			}
			function _getRandomType() {
				return vm.messageTypes[Math.floor(Math.random() * vm.messageTypes.length)];
			}
			vm.messageContents = [
				'This is a message',
				'This is also a message',
				'This might not be a message',
				'Some say this is a message, but one will confirm it',
				'No one knows if this is a message',
				'This message was cloned in a testtube',
				'Some say this is a message, but one will confirm it, Some say this is a message, but one will confirm it, Some say this is a message, but one will confirm it, Some say this is a message, but one will confirm it, Some say this is a message, but one will confirm it'
			];
			
			vm.messageTypes = ['success', 'warning', 'alert', 'info', ''];
			
			vm.message = {
				type: 'success',
				dismissButtonHtml: '&times;',
				dismissOnClick: true,
				dismissButton: true,
				showDismissButton: true,
				dismissOnTimeout: true,
				timeout: 1000
			};
			
			vm.openMessages = [];
			
			function createBasicMessage() {
				nMessages.create('The most basic message type available');
			}
			
			function createAdvancedMessage() {
				
				nMessages.create({
					type: 'success',
					content: 'Such message',
					dismissButton: true,
					dismissButtonHtml: '&times;',
					dismissOnClick: true,
					dismissOnTimeout: false,
					timeout: 4000
				});
				
			}
			
			vm.createMessage = function() {
				
				var msg = angular.copy(vm.message);
				
				msg.content = _getRandomMessage();
				msg.type = _getRandomType();
				
				var msgRef =  nMessages.create(msg);
				vm.openMessages.push(msgRef);
				
			};
			
			vm.dismissLast = function() {
				
				nMessages.dismiss(vm.openMessages[vm.openMessages.length -1]);
				vm.openMessages.pop();
			};
			
			vm.dismissAll = function() {
				
				nMessages.dismiss();
				
			};
			
			activate();
			
			function activate() {
				for (var i = 0; i < 5; i++) {
					// $timeout(vm.createMessage(), 1000);
				}
			}
		});
	
})();