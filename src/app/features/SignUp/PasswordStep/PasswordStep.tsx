import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { previousStep } from '../signUpSlice';
import styles from './PasswordStep.module.scss';

export function PasswordStep() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, t('common.errors.minLength', { min: 8 }))
      .required(t('common.errors.requiredField')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], t('signUp.passwordStep.passwordsMismatch'))
      .required(t('common.errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.PasswordStep} data-testid="EmailStep">
      <div className={styles.title}>
        <span>{t('signUp.passwordStep.title')}</span>
        <Divider className={styles.divider} variant="middle" />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={styles.textField}
          fullWidth
          size="small"
          label={t('signUp.passwordStep.password')}
          variant="outlined"
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          className={styles.textField}
          fullWidth
          size="small"
          label={t('signUp.passwordStep.confirmPassword')}
          variant="outlined"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button className={styles.previousButton} color="primary" onClick={() => dispatch(previousStep())}>
          {t('signUp.passwordStep.previous')}
        </Button>
        <Button className={styles.nextButton} variant="contained" color="primary" type="submit">
          {t('signUp.passwordStep.register')}
        </Button>
      </form>
    </div>
  );
}

