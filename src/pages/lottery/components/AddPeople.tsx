import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default class AddPeopleDialog extends PureComponent<any, any> {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  submit = ({ formData }: any) => {
    if (!lotteryState.currLottery) {
      return;
    }
    addPplToLottery(lotteryState.currLottery.id, formData);

    this.handleClose();
  };

  render() {
    const spanProps = !this.props.disabled
      ? {
          onClick: this.handleClickOpen,
        }
      : {};

    return (
      <>
        <span {...spanProps}>{this.props.children}</span>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add People</DialogTitle>
          <DialogContent>
            <DialogContentText>Add A New People to this Lottery</DialogContentText>
            <SubmitForm submit={this.submit} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

class SubmitForm extends PureComponent<any, any> {
  render() {
    return (
      <SchemaForm onSubmit={this.props.submit} uiSchema={uiSchema} schema={schema}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: '20px 0', float: 'right' }}
        >
          Submit
        </Button>
      </SchemaForm>
    );
  }
}
