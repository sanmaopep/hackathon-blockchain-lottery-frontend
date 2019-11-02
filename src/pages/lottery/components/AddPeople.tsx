import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';
import TextField from '@material-ui/core/TextField';

const schema = {
  type: 'array',
  items: {
    type: 'string',
    title: 'name',
  },
};

const uiSchema = {
  'ui:options': {
    orderable: false,
  },
};

export default function AddPeopleDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleClickOpen}>{props.children}</span>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add People</DialogTitle>
        <DialogContent>
          <DialogContentText>Add A New People to this Lottery</DialogContentText>
          <SchemaForm uiSchema={uiSchema} schema={schema} formData={['Set The Name']}>
            <span className="nothing"></span>
          </SchemaForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
