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

interface Props {
  peopleList: string[];
}

export default class PeopleList extends React.Component<Props, any> {
  render() {
    const { peopleList } = this.props;

    return (
      <div style={{ minWidth: 500 }}>
        <List>
          {peopleList
            ? peopleList.map((people, index) => {
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
          rowsPerPageOptions={[10]}
          page={0}
          count={100}
          rowsPerPage={10}
          onChangePage={() => {}}
        />
      </div>
    );
  }
}
