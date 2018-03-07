import * as React from 'react';
import { CardContent } from 'material-ui/Card';

export interface Message {
    sender: string;
    receiver: string;
    messageText: string;
    timestamp: number;
}

export interface ChatBodyProps {
    messages: Message | Message[];
}

const chatBody = (props: ChatBodyProps) => {
    return (
        <CardContent>
            messages
        </CardContent>
    );
};

export default chatBody;
