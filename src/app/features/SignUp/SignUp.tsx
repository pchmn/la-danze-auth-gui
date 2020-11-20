import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import styles from './SignUp.module.scss';


export function SignUp() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width: 530px)');
  const { t } = useTranslation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('common.errors.invalidField', { field: t('signUp.email') }))
      .required(t('common.errors.requiredField')),
    username: yup
      .string()
      .required(t('common.errors.requiredField')),
    password: yup
      .string()
      .min(8, t('common.errors.minLength', { min: 8 }))
      .required(t('common.errors.requiredField')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], t('signUp.passwordsMismatch'))
      .required(t('common.errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function textField(field: 'email' | 'username' | 'password' | 'confirmPassword') {
    return <TextField
      className={styles.textField}
      fullWidth
      size="small"
      variant="outlined"
      id={field}
      name={field}
      type={['password', 'confirmPassord'].includes(field) ? 'password' : 'text'}
      label={t(`signUp.${field}`)}
      value={formik.values[field]}
      onChange={formik.handleChange}
      error={formik.touched[field] && Boolean(formik.errors[field])}
      helperText={formik.touched[field] && formik.errors[field]}
    />;
  }

  return (
    <Container className={`${styles.SignUp} ${matches ? 'flex-column' : ''}`} maxWidth="sm">
      <div><img className={styles.logo} alt="logo" src="./images/logo-48px.png" /></div>
      <Paper className={`${styles.paper} darker`}>
        <h2 className={styles.title}>{t('signUp.title')}</h2>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {textField('email')}
          {textField('username')}
          <span className={styles.passwordHelper}>{t('signUp.passwordHelper')}</span>
          {textField('password')}
          {textField('confirmPassword')}
          <Button className={styles.submitButton} variant="contained" color="primary" type="submit">
            {t('signUp.validate')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
