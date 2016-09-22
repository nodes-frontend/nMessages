namespace component {
    'use strict';

    export interface InMessagesService {
        defaults: any,
        messages: Array<any>;
        messageStack: Array<any>;
        configure: (config: any) => void;
        create: (msg: any) => number;
        dismiss: (id: number) => void;
    }

    interface IMessage {
        id: number,
        type: string,
        dismissOnTimeout: boolean,
        timeout: number,
        dismissButton: boolean,
        dismissButtonHtml: string,
        dismissOnClick: boolean,
        horizontalPosition: string,
        verticalPosition: string,
        maxNumber: number
    }

    export class Message implements IMessage {
        id: number;
        type: string;
        dismissOnTimeout: boolean;
        timeout: number;
        dismissButton: boolean;
        dismissButtonHtml: string;
        dismissOnClick: boolean;
        horizontalPosition: string;
        verticalPosition: string;
        maxNumber: number;

        constructor(private msg: any,
                    private nMessagesService: InMessagesService){

            let id = Math.floor(Math.random()*1000);

            while (nMessagesService.messages.indexOf(id) > -1) {
                id = Math.floor(Math.random()*1000);
            }

            const message = {
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

    }

    export class NMessagesService implements InMessagesService {

        static $inject: Array<string> = [];
        constructor(){}

        public messages: Array<any> = [];
        public messageStack: Array<number> = [];

        private defaults = {
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

        public settings = this.defaults;

        configure(config: any) {
            angular.extend(this.defaults, config);
        }

        dismiss(id: number) {
            if (id) {
                for (let i = this.messages.length -1; i >= 0; i--) {
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
        }

        create(msg: any) {
            if(this.defaults.maxNumber > 0 &&
               this.messageStack.length >= this.defaults.maxNumber) {
               this.dismiss(this.messageStack[0]);
            }

            msg = (typeof msg === 'string') ? {content: msg} : msg;

            let newMsg = new Message(msg, this);

            if (this.defaults.verticalPosition === 'bottom') {
                this.messages.unshift(newMsg);
            } else {
                this.messages.push(newMsg);
            }

            this.messageStack.push(newMsg.id);

            return newMsg.id;
        }
    }

    angular
        .module('component')
        .service('nMessages', NMessagesService);
}

