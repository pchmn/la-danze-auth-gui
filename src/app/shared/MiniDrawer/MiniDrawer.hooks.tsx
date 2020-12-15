import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAnimatedRouter } from "../AnimatedRouter/AnimatedRouter.hooks";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
      // marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    transition: 'all 0.225s'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: '85px',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}));

export function useMiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { url } = useRouteMatch();
  const { switchKey, setSwitchKey, updateSwitchKey } = useAnimatedRouter();

  return { classes, open, setOpen, url, switchKey, setSwitchKey, updateSwitchKey };
}