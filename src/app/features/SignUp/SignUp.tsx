import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EmailStep } from './EmailStep/EmailStep';
import { PasswordStep } from './PasswordStep/PasswordStep';
import styles from './SignUp.module.scss';
import { selectActiveStep } from './signUpSlice';


export function SignUp() {
  const activeStep = useSelector(selectActiveStep);
  const { t } = useTranslation();

  // console.log(frTranslations);

  const transitionOptions = {
    transitionName: "fade",
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 500
  }

  const getStep = () => {
    switch (activeStep) {
      case 0: return <EmailStep key="0" />;
      case 1: return <PasswordStep key="1" />
      default: return <EmailStep key="2" />
    }
  }

  return (
    <Container maxWidth="md">
      <Paper>
        <Grid container className={styles.SignUp} direction={'row'} spacing={0}>

          <Grid item xs={6} className={styles.leftPart}>
            <div><img alt="lol" src="./images/logo-48px.png" /></div>
            <h2>{t('signUp.title')}</h2>
          </Grid>

          <Grid item xs={6} className={styles.rightPart}>
            {getStep()}
          </Grid>

        </Grid>
      </Paper>
    </Container>
  );
}
