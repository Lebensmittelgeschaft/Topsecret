// @flow
/**
 * Floating Action Button generic component 
 */
import * as React from 'react';
import Button from 'material-ui/Button';
import { withStyles, WithStyles } from 'material-ui/styles';

type FabProps = {
    children: React.ChildrenArray<any>;
    action: ((event: SyntheticMouseEvent<HTMLElement>) => void) | void;    
}

const style = (theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6
    }
});

export interface FabStyleProps {
    fab: typeof style.fab;
}

const fab = (props: FabProps & WithStyles<$Keys<FabStyleProps>>) => {
    return (
        <Button className={props.classes.fab} variant="fab" color="primary" onClick={props.action}>
            {props.children}
        </Button>
    );
};

export default withStyles(style)(fab);
