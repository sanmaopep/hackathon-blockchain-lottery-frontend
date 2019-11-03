import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
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
  interval: any;

  componentDidMount() {
    const req = () => {
      getLotteries().then(lotteries => {
        lotteryState.lotteries = lotteries;
      });
    };

    req();
    this.interval = setInterval(req, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Fab
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            zIndex: 999,
          }}
          variant="contain"
          onClick={() => {
            router.push('/lottery/new');
          }}
          color="primary"
        >
          <AddIcon />
          Add New Lottery
        </Fab>
        <h1 style={{ textAlign: 'center', margin: '5px 0' }}>Lotteries</h1>
        <Grid component="div" container={true} space={3}>
          {lotteryState.lotteries
            ? lotteryState.lotteries.map(lottery => {
                let subHeader: any;
                if (lottery.stopEnroll) {
                  subHeader = <span style={{ color: 'red' }}>Finished</span>;
                  // @ts-ignore
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
                            <Avatar
                              src={
                                lottery.hashed
                                  ? require('../../assets/Anonymous.png')
                                  : require('../../assets/Name.png')
                              }
                            />
                          }
                          title={lottery.title}
                          action={<Button>{subHeader}</Button>}
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
                        <CardActions>
                          <Button>
                            Candidates: {lottery.candidateNum} &nbsp; Winners:
                            {lottery.rounds
                              ? lottery.rounds.reduce((acm, curr) => {
                                  acm += Number(curr);
                                  return acm;
                                }, 0)
                              : 0}
                          </Button>
                        </CardActions>
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
