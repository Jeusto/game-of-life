import { React, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CasinoRoundedIcon from "@material-ui/icons/CasinoRounded";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import Link from "@material-ui/core/Link";

// Information modal
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function Header({
  isRunning,
  handleStartStop,
  handleClear,
  handleRandomize,
}) {
  // Modal states
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <h1 className="title">John Conway's Game of Life</h1>
      <div className="buttons">
        {" "}
        <div className="buttons1">
          <Button
            onClick={() => handleStartStop()}
            variant="contained"
            startIcon={
              isRunning ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />
            }
            style={{ margin: "0.5rem" }}
          >
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button
            onClick={() => handleClear()}
            variant="contained"
            startIcon={<DeleteRoundedIcon />}
            style={{ margin: "0.5rem" }}
          >
            Clear
          </Button>
        </div>
        <div className="buttons2">
          {" "}
          <Button
            onClick={() => handleRandomize()}
            variant="contained"
            startIcon={<CasinoRoundedIcon />}
            style={{ margin: "0.5rem" }}
          >
            Randomize
          </Button>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            startIcon={<InfoIcon />}
            style={{ margin: "0.5rem" }}
          >
            ABOUT
          </Button>
        </div>
      </div>{" "}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          John Conway’s Game of Life
        </DialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            The Game of Life, is a cellular automaton devised by the
            mathematician John Horton Conway in 1970. It is a zero-player game,
            meaning that its evolution is determined by its initial state,
            requiring no further input. One interacts with the Game of Life by
            creating an initial configuration and observing how it evolves. It
            is Turing complete and can simulate a universal constructor or any
            other Turing machine.
          </Typography>
          <Typography gutterBottom>
            The universe of the Game of Life is an infinite, two-dimensional
            orthogonal grid of square cells, each of which is in one of two
            possible states, live or dead. Every cell interacts with its eight
            neighbours, which are the cells that are horizontally, vertically,
            or diagonally adjacent. At each step in time, the following
            transitions occur:
          </Typography>
          <ul>
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
          <Typography>
            (Source{" "}
            <Link
              target="_blank"
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >
              Wikipedia
            </Link>
            )
          </Typography>
        </MuiDialogContent>
      </Dialog>
    </div>
  );
}
