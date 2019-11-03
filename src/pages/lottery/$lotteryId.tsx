import { Button, Divider, Icon, Input, TextField, Typography } from '@material-ui/core';
import { getLottery, getLotteryPpl, getLotteryWinner } from '@/services/lottery';

import AddPeopleDialog from './components/AddPeople';
import CheckWin from './components/CheckWin';
import PeopleList from './components/PeopleList';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import Rounds from './components/Rounds';
import { autorun } from 'mobx';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';
// @ts-ignore
import styles from '../index.less';

@observer
export default class LotteryDetail extends React.Component {
  interval: any;

  componentDidMount() {
    this.req();
    this.interval = setInterval(this.req, 5000);
  }

  req = () => {
    //@ts-ignore
    const lotteryId = this.props.match.params.lotteryId;

    getLottery(lotteryId).then(lottery => {
      lotteryState.currLottery = lottery;
    });
    getLotteryPpl(lotteryId).then(pplList => {
      lotteryState.pplList = pplList;
    });
    getLotteryWinner(lotteryId).then(winner => {
      lotteryState.winner = winner;
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { currLottery } = lotteryState;

    if (!currLottery) return 'Loading';

    return (
      <div className={styles.lotteryDetail}>
        <div className={styles.leftPanel}>
          <Rounds />
        </div>
        <div className={styles.mainContent}>
          <Typography variant="h4">
            {currLottery.title}
            <div style={{ float: 'right' }}>
              <AddPeopleDialog disabled={currLottery.stopEnroll}>
                <Button disabled={currLottery.stopEnroll} variant="contained">
                  <PersonAddIcon />
                  &nbsp; Add People
                </Button>
              </AddPeopleDialog>
              &nbsp;&nbsp;
              <CheckWin>
                <Button variant="contained">Check Result</Button>
              </CheckWin>
            </div>
          </Typography>
          <Typography style={{ marginTop: 10 }} variant="subtitle1">
            {currLottery.description}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />

          <PeopleList />
        </div>
      </div>
    );
  }
}
