import Container from '@material-ui/core/Container';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useAnimatedRouter } from '../../shared/AnimatedRouter/AnimatedRouter.hooks';
import { AnimatedRoute, AnimatedSwitch } from '../../shared/AnimatedRouter/RouteTransition';
import styles from './Auth.module.scss';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

export function Auth() {
  const matches = useMediaQuery('(max-width: 530px)');
  const { switchKey, updateSwitchKey } = useAnimatedRouter();

  return (
    <Container className={`${styles.Auth} ${matches ? 'flex-column' : ''}`} maxWidth="sm">
      <img className={styles.logo} alt="logo" src="/images/logo-48px.png" />
      <AnimatedSwitch switchKey={switchKey}>
        <AnimatedRoute path="/signup" fullHeight>
          <SignUp onSignInClik={updateSwitchKey} />
        </AnimatedRoute>
        <AnimatedRoute path="/signin" fullHeight>
          <SignIn onSignUpClik={updateSwitchKey} />
        </AnimatedRoute>
      </AnimatedSwitch>
    </Container>
  );
}

export function AuthPaper({ children, ...otherProps }: PaperProps) {
  return (
    <Paper className={styles.AuthPaper} {...otherProps}>
      {children}
    </Paper>
  );
}

