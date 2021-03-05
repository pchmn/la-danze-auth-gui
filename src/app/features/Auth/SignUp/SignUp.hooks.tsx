import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLError } from "graphql/error/GraphQLError";
import { useState } from "react";
import { useForm, UseFormMethods } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const form: UseFormMethods<any> & { onSubmit?: any } = useForm({
    resolver: yupResolver(createValidationSchema()),
  });
  form.onSubmit = onSubmit;
  // GraphQL
  const [signUp, { data, loading }] = useMutation(SIGN_UP, {
    onError(err) {
      handleError(err.graphQLErrors)
    }
  });
  // Local state
  const [signUpSuccess, setSignupSuccess] = useState(false)

  return { form, loading, t, signUpSuccess };

  function handleError(errors: readonly GraphQLError[]) {
    errors.map((error: GraphQLError) => {
      if (error.extensions && error.extensions.exception && error.extensions.exception.code === 100) {
        form.errors.email.type = 'alreadyUsed';
        form.errors.email.message = t('auth.signUp.emailAlreadyUsed');
      }
    })
  }

  function handleSuccessSignup(accessToken: string) {
    // Save in localStorage
    setStorage(StorageKey.AccessToken, accessToken);
  }

  function onSubmit(values: any) {
    console.log({ email: values.email, username: values.username, password: values.password })
    signUp({ variables: { input: { email: values.email, username: values.username, password: values.password } } })
      .then(res => {
        console.log(res);
        handleSuccessSignup(res.data.accessToken);
      })
      .catch(err => setSignupSuccess(true));
  }

  function createValidationSchema() {
    return yup.object({
      email: yup
        .string()
        .required(t('common.errors.requiredField'))
        .email(t('common.errors.invalidField', { field: t('auth.signUp.email') })),
      username: yup
        .string()
        .required(t('common.errors.requiredField'))
        .min(2, t('common.errors.minLength', { min: 2 })),
      password: yup
        .string()
        .required(t('common.errors.requiredField'))
        .min(8, t('common.errors.minLength', { min: 8 })),
      confirmPassword: yup
        .string()
        .required(t('common.errors.requiredField'))
        .oneOf([yup.ref('password'), ''], t('auth.signUp.passwordsMismatch')),
    });
  }
}
