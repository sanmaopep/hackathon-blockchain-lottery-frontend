import {
  Button,
  CircularProgress,
  Icon,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { autorun, toJS, trace } from 'mobx';
import { getLottery, getLotteryWinner, startLottery } from '@/services/lottery';
import lotteryState, { LotteryStatus } from '@/store/lottery';

import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Rounds extends React.Component {
  state = {
    currentRound: 0,
  };

  componentDidMount() {
    this.fetchData();

    autorun(() => {
      const { currLottery } = lotteryState;
      if (lotteryState.status === LotteryStatus.NotStart) {
        this.setState({
          loading: false,
        });
      }
      if (!currLottery) {
        return;
      }
      if (lotteryState.status === LotteryStatus.Finish) {
        this.setState({
          // @ts-ignore
          currentRound: currLottery.rounds.length,
        });
      }
    });
  }

  startPlaying = () => {
    // @ts-ignore
    const lotteryId = lotteryState.currLottery.id;
    startLottery(lotteryId);

    this.setState({
      loading: true,
    });

    //@ts-ignore
    this.goReqInterval();
  };

  goReqInterval = () => {
    this.fetchData();
    const reqInterval = setInterval(() => {
      this.fetchData(() => {
        clearInterval(reqInterval);
      });
    }, 2000);
  };

  fetchData = (cb = () => {}) => {
    // @ts-ignore
    const lotteryId = lotteryState.currLottery.id;

    getLottery(lotteryId).then(lottery => {
      lotteryState.currLottery = lottery;
    });

    getLotteryWinner(lotteryId).then(winner => {
      if (winner) {
        cb();
      }
      lotteryState.winner = winner;
    });
  };

  render() {
    const { currLottery, status } = lotteryState;
    const { currentRound } = this.state;

    const loading = status === LotteryStatus.Playing;

    if (!currLottery) return '';
    const rounds = currLottery.rounds;
    if (!rounds || rounds.length === 0) {
      return '';
    }

    return (
      <div>
        <Stepper activeStep={currentRound} orientation="vertical">
          {rounds.map((roundPplNum, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h4">
                    Round {index}
                    {/* {index < Number(currentRound) ? (
                      <PeopleListDialog peopleList={['Yiwei', 'KaiKai', 'Steven Johnson']}>
                        <Button variant="contained" style={{ float: 'right' }} color="primary">
                          Result
                        </Button>
                      </PeopleListDialog>
                    ) : (
                      ''
                    )} */}
                  </Typography>
                  <b>{roundPplNum}</b> People TBS
                </StepLabel>
                <StepContent>
                  {loading ? (
                    <Typography>
                      <CircularProgress />
                      &nbsp;&nbsp;&nbsp; Waiting...
                    </Typography>
                  ) : (
                    <Typography>
                      <Button
                        variant="contained"
                        onClick={() => this.startPlaying()}
                        color="primary"
                      >
                        <Icon className="fa fa-play" />
                        &nbsp;
                        <b>Start</b>
                      </Button>
                    </Typography>
                  )}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}
