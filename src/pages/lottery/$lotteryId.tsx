import { Button, Divider, Icon, Typography } from '@material-ui/core';
import { getLottery, getLotteryPpl } from '@/services/lottery';

import AddPeopleDialog from './components/AddPeople';
import PeopleList from './components/PeopleList';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import Rounds from './components/Rounds';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';

@observer
export default class LotteryDetail extends React.Component {
  componentDidMount() {
    // @ts-ignore
    const lotteryId = this.props.match.params.lotteryId;
    getLottery(lotteryId).then(lottery => {
      lotteryState.currLottery = lottery;
    });
    getLotteryPpl(lotteryId).then(pplList => {
      lotteryState.pplList = pplList;
    });
  }

  render() {
    const { currLottery } = lotteryState;

    if (!currLottery) return 'Loading';

    return (
      <div>
        <Typography variant="h4">
          {currLottery.title}
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
        <PeopleList peopleList={lotteryState.pplList} />
      </div>
    );
  }
}
