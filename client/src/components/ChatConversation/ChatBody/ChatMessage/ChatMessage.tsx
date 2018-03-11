import * as React from 'react';

const style = require('./ChatMessage.css');

export enum MessageType {
    Send = 'SENDER',
    Receive = 'RECEIVER'
}

export interface ChatMessageProps {
    type: MessageType;
    text: string;
}

const chatMessage = (props: ChatMessageProps) => {
    const messageClasses = {
        container: '',
        bubble: style.send
    };

    if (props.type === MessageType.Receive) {
        messageClasses.container = style.bubbleDirectionReverse;
        messageClasses.bubble = style.receive;
    }

    const bubbleContainerClasses = `${style.bubbleContainer} ${messageClasses.container}`;
    const bubbleClasses = `${style.bubble} ${messageClasses.bubble}`;

    return (
        <div className={bubbleContainerClasses}>
            <div className={bubbleClasses}>
                {props.text}
            </div>
        </div>
    );
};

export default chatMessage;
