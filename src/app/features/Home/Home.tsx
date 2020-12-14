import { LinkProps } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { AnimatedRoute, AnimatedSwitch } from '../../shared/animation/RouteTransition';
import styles from './Home.module.scss';

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tooltip: {
    fontSize: '1.1rem',
  }
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let [textVisibility, setTextVisibility] = useState<'hidden' | 'visible'>();
  let { url } = useRouteMatch();
  let [key, setKey] = useState<string | number>();
  const location = useLocation();

  useEffect(() => {
    setTextVisibility('hidden');
    setKey(Math.random());
    console.log('in Home')
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
    setTextVisibility('visible');
    console.log(textVisibility)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTimeout(() => setTextVisibility('hidden'), 225)
  };

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <>
      <div className={`${classes.root} ${styles.Home}`}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={styles.toolbar}>
            {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
            <div className={`${styles.logo} ${open ? styles.logoOpen : ''}`}>
              <img src="/images/logo-48px.png" />
              <span>La Danze en LDC</span>
            </div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              className={`${styles.toggleButton} ${open ? styles.open : ''}`}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
          </div>
          {/* <Divider /> */}
          <List>
            <DrawerListItem onClick={() => setKey(Math.random())} to="/my-account" title="Mon compte" selected={url === '/my-account'} key="Mon compte" open={open}>
              <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Mon compte" />
            </DrawerListItem>
            <DrawerListItem onClick={() => setKey(Math.random())} to="/settings" title="Paramètres" selected={url === '/settings'} key="Paramètres" open={open}>
              <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Paramètres" />
            </DrawerListItem>
            {/* {['Mon compte', 'Paramètres'].map((text, index) => (
            <Tooltip classes={classes} title={index % 2 === 0 ? 'Mon compte' : 'Paramètres'} placement="right">
              <ListItem selected={index % 2 === 0} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <AccountCircleOutlinedIcon /> : <SettingsOutlinedIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Tooltip>

          ))} */}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {key}
          <AnimatedSwitch switchKey={key}>
            <AnimatedRoute path="/my-account">Mon compte</AnimatedRoute>
            <AnimatedRoute path="/settings">Paramètres</AnimatedRoute>
          </AnimatedSwitch>
        </main>
      </div>
    </>
  );
}

interface DrawerListItemProps extends LinkProps {
  title: string;
  open?: boolean;
  selected: boolean;
  to: string;
}

function DrawerListItem({ children, open, title, selected, to, ...otherProps }: DrawerListItemProps) {
  return (
    <Link to={to} {...otherProps}>
      <ListItem selected={selected} button key={title} className={open ? 'open' : ''}>
        {children}
      </ListItem>
    </Link>
  );

  if (open) {
    return (
      <Link to={to}>
        <ListItem selected={selected} button key={title}>
          {children}
        </ListItem>
      </Link>
    );
  }
  return (
    <Link to={to}>
      <Tooltip title={title} placement="right">
        <ListItem selected={selected} button key={title}>
          {children}
        </ListItem>
      </Tooltip>
    </Link>

  )
}