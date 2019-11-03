import { Button, DialogActions, TextField } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PeopleList from './PeopleList';
import React from 'react';
import lotteryState from '@/store/lottery';
import sha256 from 'sha256';

export default function CheckWin(props: any) {
  const [open, setOpen] = React.useState(false);
  const [searchName, setSearchName] = React.useState('');
  const [result, setResultText] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const check = () => {
    if (lotteryState.currLottery) {
      const hashed = lotteryState.currLottery.hashed;
      const winner = lotteryState.winner;

      let testStr = searchName;
      if (hashed) {
        testStr = sha256(searchName);
      }

      if (winner) {
        let inWinner = false;
        for (let round in winner) {
          for (let winnerName of winner[round]) {
            if (winnerName === testStr) {
              inWinner = true;
              break;
            }
          }
          if (inWinner) break;
        }

        if (inWinner) return setResultText('In the Winner List!');
      }

      setResultText('Not in the winner List!');
    }
  };

  return (
    <>
      <span onClick={handleClickOpen}>{props.children}</span>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Check if the person selected</DialogTitle>
        <DialogContent>
          <TextField
            value={searchName}
            onChange={e => {
              setSearchName(e.target.value);
            }}
            style={{ width: 500 }}
            label="Passport"
          />
          <p>{result}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={check} color="primary">
            Check
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
