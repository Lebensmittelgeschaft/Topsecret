import * as React from 'react';
import Typography from 'material-ui/Typography';

export interface TypoContainerProps {
    children: React.ReactNode;
}

const typographyContainer = (props: TypoContainerProps) => {
    return (
        <Typography component="div"> 
            {props.children}
        </Typography>
    );
};

export default typographyContainer;
