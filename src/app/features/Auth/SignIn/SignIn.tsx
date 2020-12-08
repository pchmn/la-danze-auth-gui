import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { FormikTextField } from '../../../shared/components/FormikTextField';
import { useSignIn } from './SignIn.hooks';
import styles from './SignIn.module.scss';

export function SignIn() {
  const { formik, loading, t } = useSignIn();

  return (
    <>
      <h2 className={styles.title}>{t('auth.signIn.title')}</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <FormikTextField className={styles.textField} formik={formik} field="emailOrUsername" label={t('auth.signIn.emailOrUsername')} />
        <FormikTextField className={styles.textField} formik={formik} field="password" type="password" label={t('auth.password')} />
        <Button className={`${styles.submitButton} loadingButton`} disabled={!!loading} variant="contained" color="primary" type="submit">
          {t('common.form.validate')}
        </Button>
      </form>

      {loading &&
        <LinearProgress className={styles.progress} />
      }
    </>
  );
}
