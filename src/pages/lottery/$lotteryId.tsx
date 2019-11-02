import { Button, Divider, Typography } from '@material-ui/core';

import AddPeopleDialog from './components/AddPeople';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';

export default class LotteryDetail extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h4">
          H1B
          <AddPeopleDialog>
            <Button variant="contained" style={{ float: 'right' }} color="primary">
              <PersonAddIcon />
              &nbsp; Add People
            </Button>
          </AddPeopleDialog>
        </Typography>
        {/* <Typography variant="subtitle1">Description</Typography> */}
        <Divider style={{ marginTop: 20 }} />
      </div>
    );
  }
}
