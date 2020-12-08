import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { AnimatedRoute, AnimatedSwitch } from '../../../shared/animation/RouteTransition';
import { FormikTextField } from '../../../shared/components/FormikTextField';
import { useSignUp } from './SignUp.hooks';
import styles from './SignUp.module.scss';


export function SignUp() {
  const { formik, loading, path, t } = useSignUp();

  return (
    <>
      <AnimatedSwitch>
        <AnimatedRoute exact path={path}>
          <h2 className={styles.title}>{t('auth.signUp.title')}</h2>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <FormikTextField className={styles.textField} formik={formik} field="email" label={t('auth.signUp.email')} />
            <FormikTextField className={styles.textField} formik={formik} field="username" label={t('auth.signUp.username')} />
            <span className={styles.passwordHelper}>{t('auth.signUp.passwordHelper')}</span>
            <FormikTextField className={styles.textField} type="password" formik={formik} field="password" label={t('auth.password')} />
            <FormikTextField className={styles.textField} type="password" formik={formik} field="confirmPassword" label={t('auth.signUp.confirmPassword')} />
            <Button className={`${styles.submitButton} loadingButton`} disabled={!!loading} variant="contained" color="primary" type="submit">
              {t('common.form.validate')}
            </Button>
          </form>

          {loading &&
            <LinearProgress className={styles.progress} />
          }
        </AnimatedRoute>

        <AnimatedRoute exact path={`${path}/account-created`}>
          <div>
            Account created
            </div>
        </AnimatedRoute>
      </AnimatedSwitch>
    </>
  );
}
