import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

export interface AddPostDialogProps {
    onPostCreate: (text: string) => void;
    onClose: () => void;
    open: boolean;
}

export interface AddPostDialogState {
    text: string;
}

class AddPostDialog extends React.Component<AddPostDialogProps, AddPostDialogState> {

    constructor(props: AddPostDialogProps) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleCreate = () => {
        /* tslint:disable:no-console */
        this.props.onPostCreate(this.state.text);
    }

    /* tslint:disable:no-any */
    handleOnTextChange = (event: React.ChangeEvent<any>) => {
        this.setState({ ...this.state, text: event.target.value });
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Simply enter the text of the post you want to publish, and click create.
                </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        label="Post text"
                        type="text"
                        fullWidth={true}
                        onChange={this.handleOnTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddPostDialog;