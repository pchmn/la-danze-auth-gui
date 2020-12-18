import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import React, { ReactEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../../../shared/components/Form';
import { FormField } from '../../../shared/components/FormField';
import { AuthPaper } from '../Auth';
import { useSignIn } from './SignIn.hooks';
import styles from './SignIn.module.scss';

interface SignInProps {
  onSignUpClik?: ReactEventHandler<any>;
}

export function SignIn({ onSignUpClik }: React.PropsWithChildren<SignInProps>) {
  const { form, loading, t } = useSignIn();
  console.log('in SignIn')

  return (
    <>
      <span className={styles.signInHelper}>{t('auth.noAccount')}<Link onClick={onSignUpClik} to="/signup">{t('auth.signUp.title')}</Link></span>
      <AuthPaper>
        <h2 className={styles.title}>{t('auth.signIn.title')}</h2>
        <Form className={styles.form} form={form} onSubmit={form.handleSubmit(form.onSubmit)}>
          <FormField className={styles.textField} name="emailOrUsername" as={TextField} label={t('auth.signIn.emailOrUsername')} />
          <FormField className={styles.textField} name="password" type="password" as={TextField} label={t('auth.password')} />

          <Button className={`${styles.submitButton} loadingButton`} disabled={!!loading} variant="contained" color="primary" type="submit">
            {t('common.form.validate')}
          </Button>
        </Form>

        {loading &&
          <LinearProgress className={styles.progress} />
        }
      </AuthPaper>
    </>
  );
}
