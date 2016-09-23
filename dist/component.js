!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", angular.module("templates", []).run(["$templateCache", function ($templateCache) {
                $templateCache.put('src/nMessages.message.template.html', '<div class="nodes-messages__message {{ctrl.message.type}}">\n    \n    <a class="nodes-messages__close-button"\n       data-close\n       ng-if="ctrl.message.dismissButton"\n       ng-bind-html="ctrl.message.dismissButtonHtml"\n       ng-click="!ctrl.message.dismissOnClick && dismiss(ctrl.message.id)" ></a>\n    \n    <span class="nodes-messages__content">{{ctrl.message.content}}</span>\n</div>');
                $templateCache.put('src/nMessages.wrapper.template.html', '<div class="nodes-messages nodes-messages--{{hPos}}-{{vPos}}">\n    <ul class="nodes-messages__list">\n        <li ng-repeat="message in messages track by $index" n-messages-message="message">\n        </li>\n    </ul>\n</div>\n');
            }]));
        }
    };
});
$__System.register('3', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var dependencies = ['templates', 'ngSanitize', 'ngAnimate'];
                angular.module('component', dependencies);
            })(component || (component = {}));
        }
    };
});
$__System.register('4', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var Message = function () {
                    function Message(msg, nMessagesService) {
                        this.msg = msg;
                        this.nMessagesService = nMessagesService;
                        var id = Math.floor(Math.random() * 1000);
                        while (nMessagesService.messages.indexOf(id) > -1) {
                            id = Math.floor(Math.random() * 1000);
                        }
                        var message = {
                            id: id,
                            type: nMessagesService.defaults.type,
                            dismissOnTimeout: nMessagesService.defaults.dismissOnTimeout,
                            timeout: nMessagesService.defaults.timeout,
                            dismissButton: nMessagesService.defaults.dismissButton,
                            dismissButtonHtml: nMessagesService.defaults.dismissButtonHtml,
                            dismissOnClick: nMessagesService.defaults.dismissOnClick
                        };
                        angular.extend(message, msg);
                        return message;
                    }
                    return Message;
                }();
                component.Message = Message;
                var NMessagesService = function () {
                    function NMessagesService() {
                        this.messages = [];
                        this.messageStack = [];
                        this.defaults = {
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
                        this.settings = this.defaults;
                    }
                    NMessagesService.prototype.configure = function (config) {
                        angular.extend(this.defaults, config);
                    };
                    NMessagesService.prototype.dismiss = function (id) {
                        if (id) {
                            for (var i = this.messages.length - 1; i >= 0; i--) {
                                if (this.messages[i].id === id) {
                                    this.messages.splice(i, 1);
                                    this.messageStack.splice(this.messageStack.indexOf(id), 1);
                                }
                            }
                        } else {
                            while (this.messages.length > 0) {
                                this.messages.pop();
                            }
                            this.messageStack = [];
                        }
                    };
                    NMessagesService.prototype.create = function (msg) {
                        if (this.defaults.maxNumber > 0 && this.messageStack.length >= this.defaults.maxNumber) {
                            this.dismiss(this.messageStack[0]);
                        }
                        msg = typeof msg === 'string' ? { content: msg } : msg;
                        var newMsg = new Message(msg, this);
                        if (this.defaults.verticalPosition === 'bottom') {
                            this.messages.unshift(newMsg);
                        } else {
                            this.messages.push(newMsg);
                        }
                        this.messageStack.push(newMsg.id);
                        console.log(this.messages);
                        return newMsg.id;
                    };
                    NMessagesService.$inject = [];
                    return NMessagesService;
                }();
                component.NMessagesService = NMessagesService;
                angular.module('component').service('nMessages', NMessagesService);
            })(component || (component = {}));
        }
    };
});
$__System.register('5', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var Message = function () {
                    function Message(msg, config, messagesStack) {
                        this.msg = msg;
                        this.config = config;
                        this.messagesStack = messagesStack;
                        var id = Math.floor(Math.random() * 1000);
                        while (messagesStack.indexOf(id) > -1) {
                            id = Math.floor(Math.random() * 1000);
                        }
                        var message = {
                            id: id,
                            type: config.type,
                            dismissOnTimeout: config.dismissOnTimeout,
                            timeout: config.timeout,
                            dismissButton: config.dismissButton,
                            dismissButtonHtml: config.dismissButtonHtml,
                            dismissOnClick: config.dismissOnClick
                        };
                        angular.extend(message, msg);
                        return message;
                    }
                    return Message;
                }();
                angular.module('component').factory('Message', Message);
            })(component || (component = {}));
        }
    };
});
$__System.register('6', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var NMessagesMessageDirective = function () {
                    function NMessagesMessageDirective() {
                        this.bindToController = true;
                        this.link = this.linkFn;
                        this.controller = NMessagesMessageDirectiveController;
                        this.restrict = 'EA';
                        this.templateUrl = 'src/nMessages.message.template.html';
                        this.controllerAs = 'ctrl';
                        this.scope = {
                            message: '=nMessagesMessage'
                        };
                    }
                    NMessagesMessageDirective.instance = function () {
                        return new NMessagesMessageDirective();
                    };
                    NMessagesMessageDirective.prototype.linkFn = function (scope, element, attrs, ctrl) {
                        if (ctrl.message.dismissOnTimeout) {
                            ctrl.$timeout(function () {
                                // ctrl.dismiss(ctrl.message.id);
                            }, ctrl.message.timeout);
                        }
                        if (ctrl.message.dismissOnClick) {
                            element.bind('click', function () {
                                ctrl.dismiss(ctrl.message.id);
                                scope.$apply();
                                scope.$destroy();
                            });
                        }
                    };
                    NMessagesMessageDirective.$inject = [];
                    return NMessagesMessageDirective;
                }();
                var NMessagesMessageDirectiveController = function () {
                    function NMessagesMessageDirectiveController($timeout, nMessages) {
                        this.$timeout = $timeout;
                        this.nMessages = nMessages;
                    }
                    NMessagesMessageDirectiveController.prototype.dismiss = function (messageId) {
                        this.nMessages.dismiss(messageId);
                    };
                    NMessagesMessageDirectiveController.$inject = ['$timeout', 'nMessages'];
                    return NMessagesMessageDirectiveController;
                }();
                angular.module('component').directive('nMessagesMessage', NMessagesMessageDirective.instance);
            })(component || (component = {}));
        }
    };
});
$__System.register('7', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var NMessagesWrapperDirective = function () {
                    function NMessagesWrapperDirective() {
                        this.restrict = 'EA';
                        this.controller = NMessagesWrapperController;
                        this.replace = true;
                        this.templateUrl = 'src/nMessages.wrapper.template.html';
                        this.controllerAs = 'wrapper';
                        this.link = this.linkFn;
                    }
                    NMessagesWrapperDirective.instance = function () {
                        return new NMessagesWrapperDirective();
                    };
                    NMessagesWrapperDirective.prototype.linkFn = function (scope, element, attrs, ctrl) {
                        scope.hPos = ctrl.nMessages.settings.horizontalPosition;
                        scope.vPos = ctrl.nMessages.settings.verticalPosition;
                        scope.messages = ctrl.nMessages.messages; //.getMessages();
                    };
                    return NMessagesWrapperDirective;
                }();
                var NMessagesWrapperController = function () {
                    function NMessagesWrapperController(nMessages) {
                        this.nMessages = nMessages;
                    }
                    NMessagesWrapperController.prototype.getSettings = function () {
                        return this.nMessages.settings;
                    };
                    NMessagesWrapperController.prototype.getMessages = function () {
                        return this.nMessages.messages;
                    };
                    NMessagesWrapperController.$inject = ['nMessages'];
                    return NMessagesWrapperController;
                }();
                angular.module('component').directive('nMessagesWrapper', NMessagesWrapperDirective.instance);
            })(component || (component = {}));
        }
    };
});
$__System.register('1', ['2', '3', '4', '5', '6', '7'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (_1) {}, function (_2) {}, function (_3) {}, function (_4) {}, function (_5) {}, function (_6) {}],
        execute: function () {}
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=component.js.map