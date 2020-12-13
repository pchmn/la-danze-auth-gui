import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Link, useRouteMatch } from 'react-router-dom';
import { AnimatedRoute, AnimatedSwitch } from '../../shared/animation/RouteTransition';
import styles from './Auth.module.scss';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

export function Auth() {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width: 530px)');
  let { url } = useRouteMatch();
  console.log('in Auth', url)

  return (
    <>
      <Container className={`${styles.Auth} ${matches ? 'flex-column' : ''}`} maxWidth="sm">
        <img className={styles.logo} alt="logo" src="/images/logo-48px.png" />
        <BrowserRouter>
          <AnimatedSwitch>
            <AnimatedRoute path="/signup" fullHeight={true}>
              <span className={styles.signInHelper}>{t('auth.alreadyAnAccount')}<Link to="/signin">{t('auth.signIn.title')}</Link></span>
              <Paper className={`${styles.paper} darker`}>
                <SignUp />
              </Paper>
            </AnimatedRoute>
            <AnimatedRoute path="/signin" fullHeight={true}>
              <span className={styles.signInHelper}>{t('auth.noAccount')}<Link to="/signup">{t('auth.signUp.title')}</Link></span>
              <Paper className={`${styles.paper} darker`}>
                <SignIn />
              </Paper>
            </AnimatedRoute>
          </AnimatedSwitch>
        </BrowserRouter>
      </Container>
    </>
  );
}

