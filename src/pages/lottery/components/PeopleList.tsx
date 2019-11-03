import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TablePagination,
  TextField,
  Typography,
} from '@material-ui/core';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { autorun } from 'mobx';
import lotteryState from '@/store/lottery';
import { observer } from 'mobx-react';

const PER_PAGE = 10;

@observer
export default class PeopleList extends React.Component<any, any> {
  state = {
    currPagePpl: [],
    currPage: 0,
  };

  componentDidMount() {
    autorun(() => {
      const { sortedPpl } = lotteryState;
      this.setState({
        currPagePpl: sortedPpl.slice(0, PER_PAGE - 1),
        currPage: 0,
      });
    });
  }

  render() {
    const { winner, sortedPpl } = lotteryState;
    const { currPagePpl } = this.state;

    return (
      <div style={{ minWidth: 500 }}>
        <List>
          {currPagePpl
            ? currPagePpl.map((people, index) => {
                let winText = '';
                if (winner) {
                  winner.forEach((roundWinner, index) => {
                    if (roundWinner.indexOf(people) !== -1) {
                      winText = `Win in Round ${index}`;
                    }
                  });
                }

                return (
                  <ListItem key={index} button={true}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={people} />
                    {winText !== '' ? (
                      <ListItemSecondaryAction>
                        <CheckCircleOutlineIcon />
                        &nbsp; {winText}
                      </ListItemSecondaryAction>
                    ) : (
                      ''
                    )}
                  </ListItem>
                );
                return;
              })
            : ''}
        </List>
        <TablePagination
          component="div"
          rowsPerPageOptions={[PER_PAGE]}
          page={this.state.currPage}
          count={sortedPpl.length}
          rowsPerPage={PER_PAGE}
          onChangePage={(_, newPage) => {
            this.setState({
              currPage: newPage,
              currPagePpl: sortedPpl.slice(newPage * PER_PAGE, newPage * PER_PAGE + PER_PAGE),
            });
          }}
        />
      </div>
    );
  }
}
