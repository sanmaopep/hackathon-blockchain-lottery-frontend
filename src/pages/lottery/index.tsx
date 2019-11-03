import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Details';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PersonIcon from '@material-ui/icons/PersonOutline';
import React from 'react';
import { getLotteries } from '@/services/lottery';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';
import { router } from 'umi';

@observer
export default class LotteryIndex extends React.Component {
  componentDidMount() {
    getLotteries().then(lotteries => {
      lotteryState.lotteries = lotteries;
    });
  }

  render() {
    return (
      <div>
        <Fab
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
          }}
          variant="contained"
          onClick={() => {
            router.push('/lottery/new');
          }}
          color="primary"
        >
          <AddIcon />
          Add New Lottery
        </Fab>
        <Grid component="div" container={true} space={3}>
          {lotteryState.lotteries
            ? lotteryState.lotteries.map(lottery => {
                let subHeader = '';
                if (lottery.currentRound === -1) {
                  subHeader = 'Not Start Yet';
                  // @ts-ignore
                } else if (lottery.currentRound + 2 === lottery.rounds.length) {
                  subHeader = 'Finished';
                } else {
                  subHeader = 'Playing';
                }

                return (
                  <Grid item={true} xs={3} key={lottery.id}>
                    <Card style={{ margin: 20 }}>
                      <CardActionArea
                        onClick={() => {
                          router.push(`/lottery/${lottery.id}`);
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar>
                              <HowToVoteIcon />
                            </Avatar>
                          }
                          title={lottery.title}
                          subheader={subHeader}
                          action={
                            <Button>
                              &nbsp;{' '}
                              {lottery.rounds
                                ? lottery.rounds.reduce((acm, curr) => {
                                    acm += Number(curr);
                                    return acm;
                                  }, 0)
                                : 0}
                              &nbsp;/ {lottery.candidateNum} &nbsp;
                              <PersonIcon />
                            </Button>
                          }
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{
                              height: 80,
                            }}
                          >
                            {lottery.description.substring(0, 100) + '...'}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })
            : 'No Lotteries'}
        </Grid>
      </div>
    );
  }
}
