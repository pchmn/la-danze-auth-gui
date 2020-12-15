import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import React from 'react';
import { AnimatedRoute, AnimatedSwitch } from '../../shared/AnimatedRouter/RouteTransition';
import { DrawerListItem, MiniDrawer } from '../../shared/MiniDrawer/MiniDrawer';
import { useMiniDrawer } from '../../shared/MiniDrawer/MiniDrawer.hooks';
import styles from './Home.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  }
}));

export default function Home() {
  const classes = useStyles();
  const { open, setOpen, url, switchKey, updateSwitchKey } = useMiniDrawer();

  function toggleDrawer() {
    console.log('in toggle', open)
    setOpen(!open);
    console.log('in toggle', open)
  }

  return (
    <>
      <div className={`${classes.root} ${styles.Home}`}>
        <CssBaseline />
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <MiniDrawer>
          <DrawerListItem onClick={updateSwitchKey} to="/my-account" title="Mon compte" selected={url === '/my-account'} key="Mon compte">
            <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Mon compte" />
          </DrawerListItem>
          <DrawerListItem onClick={updateSwitchKey} to="/settings" title="Paramètres" selected={url === '/settings'} key="Paramètres">
            <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Paramètres" />
          </DrawerListItem>
        </MiniDrawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {switchKey}
          <AnimatedSwitch animationType="fade" switchKey={switchKey}>
            <AnimatedRoute path="/my-account">
              <div >
                Mon compte
              </div>
            </AnimatedRoute>
            <AnimatedRoute path="/settings"><div >
              Paramtres
              </div></AnimatedRoute>
          </AnimatedSwitch>
        </main>
      </div>
    </>
  );
}