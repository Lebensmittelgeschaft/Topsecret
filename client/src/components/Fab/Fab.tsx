import * as React from 'react';
import Button from 'material-ui/Button';

export interface FabProps {
    children: React.ReactNode;
}

const fab = (props: FabProps) => {
    return (
        <Button variant="fab" color="primary" aria-label="add">
            {props.children}
        </Button>
    );
};

export default fab;
