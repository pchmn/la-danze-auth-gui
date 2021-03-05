import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
  console.log('in Home not demo')

  function toggleDrawer() {
    console.log('in toggle', open)
    setOpen(!open);
    console.log('in toggle', open)
  }

  return (
    <>
      <div className={`${classes.root} ${styles.Home}`}>
        <CssBaseline />
        <MiniDrawer>
          <DrawerListItem onClick={updateSwitchKey} to="/home/my-account" title="Mon compte" selected={url === '/home/my-account'} key="Mon compte">
            <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Mon compte" />
          </DrawerListItem>
          <DrawerListItem onClick={updateSwitchKey} to="/home/settings" title="Paramètres" selected={url === '/home/settings'} key="Paramètres">
            <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Paramètres" />
          </DrawerListItem>
        </MiniDrawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {switchKey}
          <AnimatedSwitch animationType="slideLeft" switchKey={switchKey}>
            <AnimatedRoute path="/home/my-account">
              <Routes />
              {/* <div style={{ textAlign: 'center' }}>
                <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
                  <Link to="/home/my-account/" onClick={() => setSwitchKey2(Math.random())}>Go to Route 1</Link>
                </Button>
                <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
                  <Link to="/home/my-account/route2" onClick={() => setSwitchKey2(Math.random())}>Go to Route 2</Link>
                </Button>
                <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
                  <Link to="/home/my-account/route3" onClick={() => setSwitchKey2(Math.random())}>Go to Route 3</Link>
                </Button>

                <div className={styles.animationResult}>
                  <span>Result:</span>
                  <Paper variant="outlined" className={styles.paperResult}>
                    <AnimatedSwitch switchKey={switchKey2} animationType="slideLeft">
                      <AnimatedRoute exact path="/home/my-account/">
                        <div style={{ textAlign: 'center' }}>Route 1</div>
                      </AnimatedRoute>
                      <AnimatedRoute path="/home/my-account/route2">
                        <div style={{ textAlign: 'center' }}>Route 2</div>
                      </AnimatedRoute>
                      <AnimatedRoute path="/home/my-account/route3">
                        <div style={{ textAlign: 'center' }}>Route 3</div>
                      </AnimatedRoute>
                    </AnimatedSwitch>

                    <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route path="/animations/route1">
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 1</motion.div>
                  </Route>
                  <Route path="/animations/route2">
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 2</motion.div>
                  </Route>
                  <Route path="/animations/route3">
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 3</motion.div>
                  </Route>
                </Switch>
              </AnimatePresence>

                    <Switch location={location} key={switchKey}>
                <Route path="/animations/route1">
                  <div style={{ textAlign: 'center' }}>Route 1 normal</div>
                  <AnimatePresence exitBeforeEnter>
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 1</motion.div>
                  </AnimatePresence>
                </Route>
                <Route path="/animations/route2">
                  <div style={{ textAlign: 'center' }}>Route 2 normal</div>
                  <AnimatePresence>
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 2</motion.div>
                  </AnimatePresence>
                </Route>
                <Route path="/animations/route3">
                  <div style={{ textAlign: 'center' }}>Route 3 normal</div>
                  <AnimatePresence exitBeforeEnter>
                    <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 3</motion.div>
                  </AnimatePresence>
                </Route>
              </Switch>
                  </Paper>
                </div>
              </div> */}
            </AnimatedRoute>
            <AnimatedRoute path="/home/settings">
              <div style={{ textAlign: 'center' }}>
                Paramtres
              </div>
            </AnimatedRoute>
          </AnimatedSwitch>
        </main>
      </div>
    </>
  );
}

function Routes() {
  const [switchKey2, setSwitchKey2] = useState(Math.random());

  return (
    <div style={{ textAlign: 'center' }}>
      <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
        <Link to="/home/my-account/route1" onClick={() => setSwitchKey2(Math.random())}>Go to Route 1</Link>
      </Button>
      <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
        <Link to="/home/my-account/route2" onClick={() => setSwitchKey2(Math.random())}>Go to Route 2</Link>
      </Button>
      <Button className={styles.animateButton} variant="contained" color="primary" type="submit">
        <Link to="/home/my-account/route3" onClick={() => setSwitchKey2(Math.random())}>Go to Route 3</Link>
      </Button>

      <div className={styles.animationResult}>
        <span>Result:</span>
        <Paper variant="outlined" className={styles.paperResult}>
          <AnimatedSwitch switchKey={switchKey2} animationType="slideLeft">
            <AnimatedRoute path="/home/my-account/route1">
              <div style={{ textAlign: 'center' }}>Route 1</div>
            </AnimatedRoute>
            <AnimatedRoute path="/home/my-account/route2">
              <div style={{ textAlign: 'center' }}>Route 2</div>
            </AnimatedRoute>
            <AnimatedRoute exact path="/home/my-account/">
              <Redirect to='/home/my-account/route1' />
            </AnimatedRoute>
          </AnimatedSwitch>

          {/* <AnimateSwitch switchKey={switchKey2} animationType="slideLeft">
            <AnimateRoute path="/home/my-account/route1">
              <div style={{ textAlign: 'center' }}>Route 1</div>
            </AnimateRoute>
            <AnimateRoute path="/home/my-account/route2">
              <div style={{ textAlign: 'center' }}>Route 2</div>
            </AnimateRoute>
            <AnimateRoute exact path="/home/my-account/">
              <Redirect to='/home/my-account/route1' />
            </AnimateRoute>
          </AnimateSwitch> */}

          {/* <AnimatePresence exitBeforeEnter>
    <Switch location={location} key={location.pathname}>
      <Route path="/animations/route1">
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 1</motion.div>
      </Route>
      <Route path="/animations/route2">
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 2</motion.div>
      </Route>
      <Route path="/animations/route3">
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 3</motion.div>
      </Route>
    </Switch>
  </AnimatePresence> */}

          {/* <Switch location={location} key={switchKey}>
    <Route path="/animations/route1">
      <div style={{ textAlign: 'center' }}>Route 1 normal</div>
      <AnimatePresence exitBeforeEnter>
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 1</motion.div>
      </AnimatePresence>
    </Route>
    <Route path="/animations/route2">
      <div style={{ textAlign: 'center' }}>Route 2 normal</div>
      <AnimatePresence>
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 2</motion.div>
      </AnimatePresence>
    </Route>
    <Route path="/animations/route3">
      <div style={{ textAlign: 'center' }}>Route 3 normal</div>
      <AnimatePresence exitBeforeEnter>
        <motion.div variants={scaleVariant} initial="initial" animate="in" exit="out" style={{ textAlign: 'center' }}>Route 3</motion.div>
      </AnimatePresence>
    </Route>
  </Switch> */}
        </Paper>
      </div>
    </div>
  )
}