(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'component'
	]);
	
	angular
		.module('demoApp')
		.controller('demoController', function(nMessages) {
			var vm = this;
			
			nMessages.configure({
				verticalPosition: 'top',
				horizontalPosition: 'right'
			});
			
			vm.createBasicMessage = createBasicMessage;
			
			
			vm.openMessages = [];
			
			function createBasicMessage() {
				console.warn('BASIC MESSAGE');
				nMessages.create('The most basic message type available');
			}
		});
	
})();