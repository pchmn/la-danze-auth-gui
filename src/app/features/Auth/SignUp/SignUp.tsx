import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { AnimatePresence } from 'framer-motion';
import React, { ReactEventHandler, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MountTransition } from '../../../shared/AnimatedRouter/MountTransition';
import { Form } from '../../../shared/components/Form';
import { FormField } from '../../../shared/components/FormField';
import { AuthPaper } from '../Auth';
import { useSignUp } from './SignUp.hooks';
import styles from './SignUp.module.scss';

interface SignUpProps {
  onSignInClik?: ReactEventHandler<any>;
}

export function SignUp({ onSignInClik }: React.PropsWithChildren<SignUpProps>) {
  let { form, t, loading, signUpSuccess } = useSignUp();

  useEffect(() => setFixedHeight());

  function setFixedHeight() {
    const authPaperElt: any = document.querySelector('div[class*="AuthPaper"]');
    if (authPaperElt && !authPaperElt.style.minHeight) {
      authPaperElt.style.minHeight = getComputedStyle(authPaperElt).height;
    }
  }

  function handleSignInClick(event: any) {
    if (loading) {
      event.preventDefault();
      return;
    }
    return onSignInClik;
  }

  function SignUpForm() {
    return (
      <>
        <h2 className={styles.title}>{t('auth.signUp.title')}</h2>
        <Form disabled={loading} className={styles.form} form={form} onSubmit={form.handleSubmit(form.onSubmit)}>
          <FormField className={styles.textField} name="email" as={TextField} label={t('auth.signUp.email')} />
          <FormField className={styles.textField} name="username" as={TextField} label={t('auth.signUp.username')} />

          <span className={styles.passwordHelper}>{t('auth.signUp.passwordHelper')}</span>
          <FormField className={styles.textField} type="password" name="password" as={TextField} label={t('auth.password')} />
          <FormField className={styles.textField} type="password" name="confirmPassword" as={TextField} label={t('auth.signUp.confirmPassword')} />

          <Button className={`${styles.submitButton} loadingButton`} disabled={loading} variant="contained" color="primary" type="submit">
            {t('common.form.validate')}
          </Button>
        </Form>

        {loading &&
          <LinearProgress className={styles.progress} />
        }
      </>
    );
  }

  function AccountCreated() {
    return (
      <AnimatePresence exitBeforeEnter>
        <MountTransition fullHeight>
          <div className={styles.AccountCreated}>
            <h2 className={styles.title}>{t('auth.signUp.welcome', { name: 'Jean Gini' })}</h2>
            <div>
              <img src="/images/email-sent.png" alt="" />
              <span>{t('auth.signUp.emailConfirmationHelper')}</span>
            </div>
            <Button className={styles.submitButton} variant="contained" color="primary" type="submit">
              <Link to='/lol'>{t('auth.signUp.myAccount')}</Link>
            </Button>
          </div>
        </MountTransition>
      </AnimatePresence>
    );
  }

  return (
    <>
      <span className={styles.signInHelper}>
        {signUpSuccess
          ? <>{t('auth.signUp.accountCreated')}</>
          : <>{t('auth.alreadyAnAccount')}<Link onClick={handleSignInClick} to="/signin">{t('auth.signIn.title')}</Link></>
        }
      </span>
      <AuthPaper>
        {signUpSuccess
          ? AccountCreated()
          : SignUpForm()
        }
      </AuthPaper>
    </>
  );
};
