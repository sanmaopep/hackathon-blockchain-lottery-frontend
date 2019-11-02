import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TablePagination,
  Typography,
} from '@material-ui/core';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';

const PER_PAGE = 10;

interface Props {
  peopleList: string[];
}

export default class PeopleList extends React.Component<Props, any> {
  state = {
    currPagePpl: [],
    currPage: 0,
  };

  componentDidMount() {
    this.setState({
      currPagePpl: this.props.peopleList.slice(0, PER_PAGE - 1),
      currPage: 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.peopleList !== this.props.peopleList) {
      this.setState({
        currPagePpl: nextProps.peopleList.slice(0, PER_PAGE - 1),
        currPage: 0,
      });
    }
  }

  render() {
    const { peopleList } = this.props;
    const { currPagePpl } = this.state;

    return (
      <div style={{ minWidth: 500 }}>
        <List>
          {currPagePpl
            ? currPagePpl.map((people, index) => {
                return (
                  <ListItem key={index} button={true}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={people} />
                    <ListItemSecondaryAction>
                      <CheckCircleOutlineIcon />
                      &nbsp; Win
                    </ListItemSecondaryAction>
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
          count={peopleList.length}
          rowsPerPage={PER_PAGE}
          onChangePage={(_, newPage) => {
            this.setState({
              currPage: newPage,
              currPagePpl: peopleList.slice(newPage * PER_PAGE, newPage * PER_PAGE + PER_PAGE),
            });
          }}
        />
      </div>
    );
  }
}
