import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TablePagination,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import React from 'react';

interface Props {
  peopleList: string[];
}

export default class PeopleList extends React.Component<Props, any> {
  render() {
    const { peopleList } = this.props;

    return (
      <div>
        <List>
          {peopleList
            ? peopleList.map((people, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={people} />
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
