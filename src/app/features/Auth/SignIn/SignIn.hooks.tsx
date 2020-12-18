import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { GraphQLError } from "graphql";
import { useForm, UseFormMethods } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from 'yup';
import { setStorage, StorageKey } from "../../../core/storage/appStorage";

// GraphQL
const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
    }
  }
`;

/**
 * Get SignUp hook
 * 
 * @returns  hook
 */
export function useSignIn() {
  // Translations
  const { t } = useTranslation();
  // Form
  // Form
  const form: UseFormMethods<any> & { onSubmit?: any } = useForm({
    resolver: yupResolver(createValidationSchema()),
  });
  // GraphQL
  const [signIn, { data, loading }] = useMutation(SIGN_IN, {
    onError(err) {
      handleError(err.graphQLErrors)
    }
  });
  // Router
  const history = useHistory();
  const { path } = useRouteMatch();

  return { form, loading, t };

  function onSubmit(values: any) {
    console.log(values)
    signIn({ variables: { input: { emailOrUsername: values.emailOrUsername, password: values.password } } })
      .then(res => {
        console.log(res);
        handleSuccessSignIn(res.data.accessToken);
      })
      .catch(err => console.log(err));
  }


  function handleError(errors: readonly GraphQLError[]) {
    errors.map((error: GraphQLError) => {
      console.log(error)
      // if (error.extensions && error.extensions.exception && error.extensions.exception.code === 100) {
      //   formik.setErrors({ email: 'Email déjà utilisé' });
      // }
    })
  }

  function handleSuccessSignIn(accessToken: string) {
    // Save in localStorage
    setStorage(StorageKey.AccessToken, accessToken);
    // Go to my account
    history.push(`${path}/account-created`)
  }

  function createValidationSchema() {
    return yup.object({
      emailOrUsername: yup
        .string()
        .required(t('common.errors.requiredField')),
      password: yup
        .string()
        .required(t('common.errors.requiredField')),
    });
  }


  // function createFormik() {
  //   const validationSchema = yup.object({
  //     emailOrUsername: yup
  //       .string()
  //       .required(t('common.errors.requiredField')),
  //     password: yup
  //       .string()
  //       .required(t('common.errors.requiredField')),
  //   });

  //   return useFormik({
  //     initialValues: {
  //       emailOrUsername: '',
  //       password: ''
  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: (values) => {
  //       console.log(values)
  //       signIn({ variables: { input: { emailOrUsername: values.emailOrUsername, password: values.password } } }).then(res => {
  //         console.log(res);
  //         handleSuccessSignIn(res.data.accessToken);
  //       });
  //     },
  //   });
  // }
}