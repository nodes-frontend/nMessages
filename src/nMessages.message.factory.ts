namespace component {
    'use strict';

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

    class Message implements IMessage{
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
                    private config: any,
                    private messagesStack: Array<number>) {

            let id = Math.floor(Math.random()*1000);

            while (messagesStack.indexOf(id) > -1) {
                id = Math.floor(Math.random()*1000);
            }

            const message = {
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
    }

    angular
        .module('component')
        .factory('Message', Message);
}