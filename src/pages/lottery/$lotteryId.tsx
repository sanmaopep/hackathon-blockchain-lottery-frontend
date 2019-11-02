import { Button, Divider, Icon, Typography } from '@material-ui/core';

import AddPeopleDialog from './components/AddPeople';
import PeopleList from './components/PeopleList';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import Rounds from './components/Rounds';

export default class LotteryDetail extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h4">
          H1B
          <div style={{ float: 'right' }}>
            {/* <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
              <Icon className="fa fa-play" />
              Start
            </Button> */}
            <AddPeopleDialog>
              <Button variant="contained">
                <PersonAddIcon />
                &nbsp; Add People
              </Button>
            </AddPeopleDialog>
          </div>
        </Typography>
        {/* <Typography variant="subtitle1">Description</Typography> */}
        <Divider style={{ margin: '20px 0' }} />
        <Rounds />
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="h5">People List</Typography>
        <PeopleList peopleList={['Yiwei', 'KaiKai', 'Steven Johnson']} />
      </div>
    );
  }
}
