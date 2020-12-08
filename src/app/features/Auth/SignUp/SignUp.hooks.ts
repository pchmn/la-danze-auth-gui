import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import { GraphQLError } from "graphql/error/GraphQLError";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from 'yup';
import { setStorage, StorageKey } from "../../../core/storage/appStorage";


// GraphQL
const SIGN_UP = gql`
  mutation Signup($input: SignUpInput!) {
    signUp(input: $input) {
      accessToken
    }
  }
`;

/**
 * Get SignUp hook
 * 
 * @returns  hook
 */
export function useSignUp() {
  // Translations
  const { t } = useTranslation();
  // Form
  const formik = createFormik();
  // GraphQL
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
    onError(err) {
      handleError(err.graphQLErrors)
    }
  });
  // Router
  const history = useHistory();
  const { path } = useRouteMatch();

  return { formik, data, loading, error, path, t };


  function handleError(errors: readonly GraphQLError[]) {
    errors.map((error: GraphQLError) => {
      if (error.extensions && error.extensions.exception && error.extensions.exception.code === 100) {
        formik.setErrors({ email: 'Email déjà utilisé' });
      }
    })
  }

  function handleSuccessSignup(accessToken: string) {
    // Save in localStorage
    setStorage(StorageKey.AccessToken, accessToken);
    // Go to my account
    history.push(`${path}/account-created`)
  }


  function createFormik() {
    const validationSchema = yup.object({
      email: yup
        .string()
        .email(t('common.errors.invalidField', { field: t('auth.signUp.email') }))
        .required(t('common.errors.requiredField')),
      username: yup
        .string()
        .min(2, t('common.errors.minLength', { min: 2 }))
        .required(t('common.errors.requiredField')),
      password: yup
        .string()
        .min(8, t('common.errors.minLength', { min: 8 }))
        .required(t('common.errors.requiredField')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], t('auth.signUp.passwordsMismatch'))
        .required(t('common.errors.requiredField')),
    });

    return useFormik({
      initialValues: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log({ email: values.email, username: values.username, password: values.password })
        signUp({ variables: { input: { email: values.email, username: values.username, password: values.password } } }).then(res => {
          console.log(res);
          handleSuccessSignup(res.data.accessToken);
        });
      },
    });
  }
}
