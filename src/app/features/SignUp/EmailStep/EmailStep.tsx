import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { RootState } from '../../../core/redux/store';
import { nextStep, setEmail, setFormTouched, setUsername } from '../signUpSlice';
import styles from './EmailStep.module.scss';


export function EmailStep() {
  const email = useSelector((state: RootState) => state.signUp.email);
  const username = useSelector((state: RootState) => state.signUp.username);
  const formTouched = useSelector((state: RootState) => state.signUp.emailFormTouched);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('common.errors.invalidField', { field: t('signUp.emailStep.email') }))
      .required(t('common.errors.requiredField')),
    username: yup
      .string()
      .required(t('common.errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      email,
      username,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setEmail(values.email));
      dispatch(setUsername(values.username));
      dispatch(setFormTouched())
      dispatch(nextStep());
    },
    initialTouched: { email: formTouched, username: formTouched }
  });

  return (
    <div className={styles.EmailStep} data-testid="EmailStep">
      <div className={styles.title}>
        <span>{t('signUp.emailStep.title')}</span>
        <Divider className={styles.divider} variant="middle" />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={styles.textField}
          fullWidth
          size="small"
          variant="outlined"
          id="email"
          name="email"
          label={t('signUp.emailStep.email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={styles.textField}
          fullWidth
          size="small"
          variant="outlined"
          id="username"
          name="username"
          label={t('signUp.emailStep.username')}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <Button className={styles.submitButton} variant="contained" color="primary" type="submit">
          {t('signUp.emailStep.next')}
        </Button>
      </form>
    </div>
  );
}


