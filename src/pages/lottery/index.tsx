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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';
import { router } from 'umi';

@observer
export default class LotteryIndex extends React.Component {
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
              <ListItem key={lottery.id} button={true}>
                <ListItemAvatar>
                  <Avatar>
                    <HowToVoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={lottery.name} secondary={lottery.status} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <PersonAddIcon />
                  </IconButton>
                  <IconButton>
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
