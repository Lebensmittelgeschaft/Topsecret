// @flow
import * as React from 'react';
import { CardContent } from 'material-ui/Card';
import ChatMessage, { MessageType } from './ChatMessage/ChatMessage';

type Message = {
    sender: string;
    receiver: string;
    messageText: string;
    timestamp: number;
}

type ChatBodyProps = {
    className?: string;
    messages: Message | Message[];
}

const chatBody = (props: ChatBodyProps) => {
    return (
        <CardContent className={props.className}>
            <ChatMessage type={MessageType.Receive} text="Hey whatsup?" />
            <ChatMessage type={MessageType.Send} text="Fine what bout u?" />
            <ChatMessage type={MessageType.Receive} text="Everything ok, how bout u?" />
            <ChatMessage type={MessageType.Send} text="Also good as you said" />
            <ChatMessage type={MessageType.Receive} text="Ok bye" />
            <ChatMessage type={MessageType.Send} text="Bye" />
            <ChatMessage type={MessageType.Receive} text="Hey whatsup?" />
            <ChatMessage type={MessageType.Send} text="Fine what bout u?" />
            <ChatMessage type={MessageType.Receive} text="Everything ok, how bout u?" />
            <ChatMessage type={MessageType.Send} text="Also good as you said" />
            <ChatMessage type={MessageType.Receive} text="Ok bye" />
            <ChatMessage type={MessageType.Send} text="Bye" />
            <ChatMessage type={MessageType.Receive} text="Hey whatsup?" />
            <ChatMessage type={MessageType.Send} text="Fine what bout u?" />
            <ChatMessage type={MessageType.Receive} text="Everything ok, how bout u?" />
            <ChatMessage type={MessageType.Send} text="Also good as you said" />
            <ChatMessage type={MessageType.Receive} text="Ok bye" />
            <ChatMessage type={MessageType.Send} text="Bye" />
        </CardContent>
    );
};

export default chatBody;
