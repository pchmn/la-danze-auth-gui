import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { useMiniDrawer } from "./MiniDrawer.hooks";
import styles from './MiniDrawer.module.scss';


export function MiniDrawer({ children }: React.PropsWithChildren<any>) {
  const { classes, open, setOpen, url, updateSwitchKey } = useMiniDrawer();
  const matches = useMediaQuery('(max-width: 600px)');

  function toggleDrawer() {
    setOpen(!open);
  }

  function childrenWithProps() {
    return React.Children.map(children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement<any>(child)) {
        return React.cloneElement(child, { open });
      }
      return child;
    });
  }

  const drawer = (
    <>
      <div className={styles.toolbar}>
        <div className={`${styles.logo} ${open ? styles.logoOpen : ''}`}>
          <img src="/images/logo-48px.png" />
          <span>La Danze en LDC</span>
        </div>
        <Hidden xsDown implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={`${styles.toggleButton} ${open ? styles.open : ''}`}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Hidden>
      </div>
      <List className={styles.drawerList}>
        {childrenWithProps()}
      </List>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      {matches
        ? <>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={open}
            className={`${styles.MiniDrawer} ${styles.MobileDrawer}`}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </>
        : <Drawer
          variant="permanent"
          className={`${clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })} ${styles.MiniDrawer}`}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {drawer}
        </Drawer>
      }
      {/* <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={`${clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })} ${styles.MiniDrawer}`}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={'left'}
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden> */}
    </>
  );
}



interface DrawerListItemProps extends LinkProps {
  title: string;
  open?: boolean;
  selected?: boolean;
  to: string;
}

const useStylesBootstrap = makeStyles((theme) => ({
  tooltip: {
    fontSize: '1rem',
    marginLeft: '20px'
  },
}));

export function DrawerListItem({ children, open, title, selected, to, ...otherProps }: DrawerListItemProps) {
  const classes = useStylesBootstrap();

  return (
    <Link to={to} {...otherProps}>
      <Tooltip classes={classes} title={open ? '' : title} placement="right">
        <ListItem selected={selected} button key={title}>
          {children}
        </ListItem>
      </Tooltip>
    </Link>
  )
}