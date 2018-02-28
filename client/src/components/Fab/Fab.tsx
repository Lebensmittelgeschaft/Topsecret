/**
 * Floating Action Button generic component 
 */
import * as React from 'react';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

export interface FabProps {
    children: React.ReactNode;
    action: ((event: React.MouseEvent<HTMLElement>) => void) | undefined;    
}

export interface FabStyleProps {
    fab: React.CSSProperties;
}

const style = (theme: Theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6
    }
} as FabStyleProps);

const fab = (props: FabProps & WithStyles<keyof FabStyleProps>) => {
    return (
        <Button className={props.classes.fab} variant="fab" color="primary" onClick={props.action}>
            {props.children}
        </Button>
    );
};

export default withStyles(style)(fab);
