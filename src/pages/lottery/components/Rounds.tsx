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

import PeopleList from './PeopleList';
import PeopleListDialog from './PeopleDialog';
import React from 'react';
import { getLottery } from '@/services/lottery';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';

@observer
export default class Rounds extends React.Component {
  state = {
    loading: false,
    currentRound: -1,
  };

  startPlaying = currentRound => {
    // @ts-ignore
    const lotteryId = lotteryState.currLottery.id;

    // send start request

    this.setState({ loading: true, currentRound });

    // request the state every 5 seconds
    const interval = setInterval(async () => {
      const lottery = await getLottery(lotteryId);
      const newRound = Number(lottery.currentRound) + 1;
      if (newRound > currentRound) {
        this.setState({ loading: false, currentRound: newRound });
        lotteryState.currLottery = lottery;
        clearInterval(interval);
      }
    }, 5000);
  };

  render() {
    const { currLottery } = lotteryState;

    if (!currLottery) return '';
    let { currentRound, rounds } = currLottery;
    if (!rounds || rounds.length === 0 || !currentRound) {
      return '';
    }

    return (
      <div>
        <Stepper activeStep={currentRound + 1} orientation="vertical">
          {rounds.map((roundPplNum, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6">
                    Round {index}
                    {index <= Number(currentRound) ? (
                      <PeopleListDialog peopleList={['Yiwei', 'KaiKai', 'Steven Johnson']}>
                        <Button variant="contained" style={{ float: 'right' }} color="primary">
                          Result
                        </Button>
                      </PeopleListDialog>
                    ) : (
                      ''
                    )}
                  </Typography>
                  <b>{roundPplNum}</b> People TBS
                </StepLabel>
                <StepContent>
                  {this.state.loading ? (
                    <Typography>
                      <CircularProgress />
                      &nbsp;&nbsp;&nbsp; This Round is Playing, Waiting...
                    </Typography>
                  ) : (
                    <Typography>
                      Click
                      <Button onClick={() => this.startPlaying(index)} color="primary">
                        <Icon className="fa fa-play" />
                        Start
                      </Button>
                      To Begin This Round
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
