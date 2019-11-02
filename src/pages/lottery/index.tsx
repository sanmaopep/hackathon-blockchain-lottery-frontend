import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import DetailsIcon from '@material-ui/icons/Details';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PersonIcon from '@material-ui/icons/Person';
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
        <Typography variant="h4">
          Lottery List
          <Button
            variant="contained"
            onClick={() => {
              router.push('/lottery/new');
            }}
            style={{ float: 'right' }}
            color="primary"
          >
            New
          </Button>
        </Typography>
        <List style={{ marginTop: 20 }}>
          {lotteryState.lotteries.map(lottery => {
            return (
              <ListItem
                key={lottery.id}
                button={true}
                onClick={() => {
                  router.push(`/lottery/${lottery.id}`);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <HowToVoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={lottery.name} secondary={lottery.status} />
                <ListItemSecondaryAction>
                  <Button>
                    &nbsp; 23 / 100 &nbsp;
                    <PersonIcon />
                  </Button>

                  <IconButton
                    onClick={() => {
                      router.push(`/lottery/${lottery.id}`);
                    }}
                  >
                    <DetailsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
