// @flow
import * as React from 'react';

const style = require('./ChatMessage.css');

export const MessageType = {
    Send: 'Send',
    Receive: 'Receive'
}

type MessageTypeValues = $Keys<typeof MessageType>;

type ChatMessageProps = {
    type: MessageTypeValues;
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
