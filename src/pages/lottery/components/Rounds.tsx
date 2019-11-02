import { Button, Icon, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';

import React from 'react';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';

@observer
export default class Rounds extends React.Component {
  render() {
    return (
      <div>
        <Stepper activeStep={lotteryState.currentRound} orientation="vertical">
          {lotteryState.rounds.map((round, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6">
                    Round {index}
                    {index < lotteryState.currentRound ? (
                      <Button variant="contained" style={{ float: 'right' }} color="primary">
                        Lottery Result
                      </Button>
                    ) : (
                      ''
                    )}
                  </Typography>
                  <b>{round.num}</b> People TBS
                </StepLabel>
                <StepContent>
                  <Typography>
                    Click
                    <Button color="primary">
                      <Icon className="fa fa-play" />
                      Start
                    </Button>
                    To Begin This Round
                  </Typography>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}
