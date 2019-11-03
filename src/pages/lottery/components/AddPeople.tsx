import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';
import TextField from '@material-ui/core/TextField';
import { addPplToLottery } from '@/services/lottery';
import lotteryState from '@/store/lottery';

const schema = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'string',
    title: 'Passport',
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

  const submit = ({ formData }: any) => {
    if (!lotteryState.currLottery) {
      return;
    }
    addPplToLottery(lotteryState.currLottery.id, formData);

    handleClose();
  };

  const spanProps = !props.disabled
    ? {
        onClick: handleClickOpen,
      }
    : {};

  return (
    <>
      <span {...spanProps}>{props.children}</span>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add People</DialogTitle>
        <DialogContent>
          <DialogContentText>Add A New People to this Lottery</DialogContentText>
          <SchemaForm onSubmit={submit} uiSchema={uiSchema} schema={schema}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: '20px 0', float: 'right' }}
            >
              Submit
            </Button>
          </SchemaForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
