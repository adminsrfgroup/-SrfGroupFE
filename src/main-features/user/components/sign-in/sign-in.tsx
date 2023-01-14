import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab/Fab';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookLogin from 'react-facebook-login';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Breadcrumbs from '@mui/material/Breadcrumbs/Breadcrumbs';
import Slide from '@mui/material/Slide';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Container from '@mui/material/Container/Container';
// import { GoogleLogin } from "react-google-login";
import { useTranslation } from 'react-i18next';
import {
  allLoginSelector,
  allSessionSelector,
  loginWithFacebook,
  loginWithGoogle,
} from '../../store/slice';
import {
  initialValuesSignIn,
  validationSchemaSignIn,
} from '../../validation/validation-signin';
import { IFacebook, IGooglePlus } from '../../../../shared/model/user.model';
import { SourceProvider } from '../../../../shared/enums/source-provider';
import { ALL_APP_ROUTES } from '../../../../core/config/all-app-routes';
// import { AllAppConfig } from "../../../../core/config/all-config";
import { loginUser } from '../../store/slice';
import './sign-in.scss';
import Stack from '@mui/material/Stack';
import { GoogleSignin } from '../../../../shared/components/google-signin/google-signin';
import { decodeJwtResponse } from '../../../../shared/utils/utils-functions';

const initialValues = initialValuesSignIn;

export default function SignIn() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    showPassword: false,
  });
  const [checkedRememberMe, setCheckedRememberMe] =
    React.useState<boolean>(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(allLoginSelector);
  // const { currentLocale } = useSelector(allLocaleSelector);
  const { oneSignalId } = useSelector(allSessionSelector);

  const handleClickShowPassword = () => {
    setShowPassword({
      showPassword: !showPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setStartAnimation(true);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.email.toString(),
          password: values.password.toString(),
          oneSignalId: oneSignalId,
          rememberMe: checkedRememberMe,
        })
      );
    },
  });

  const responseGoogle = (response: any) => {
    if (response?.credential) {
      const user = JSON.parse(decodeJwtResponse(response.credential));
      const requestData: IGooglePlus = {
        Ba: '',
        tokenId: response.credential,
        googleId: response.clientId,
        profileObj: {
          email: user.email,
          familyName: user.family_name,
          givenName: user.given_name,
          imageUrl: user.picture,
          name: user.name,
        },
        idOneSignal: oneSignalId,
        sourceConnectedDevice: SourceProvider.GOOGLE_PLUS,
      };
      dispatch(loginWithGoogle({ ...requestData }));
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRememberMe(event.target.checked);
  };

  // const logoutFB = useCallback(() => {
  //   FB.logout((response: any) => {
  //     console.log('FB logout');
  //   });
  // }, [])

  const loginFB = useCallback(() => {
    FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          FB.api(
            '/me',
            { fields: 'id,name,email,picture' },
            (responseMe: any) => {
              const requestData: IFacebook = {
                accessToken: response.authResponse.accessToken,
                data_access_expiration_time:
                  response.authResponse.data_access_expiration_time,
                graphDomain: response.authResponse.graphDomain,
                signedRequest: response.authResponse.signedRequest,
                email: responseMe.email,
                id: responseMe.id,
                name: responseMe.name,
                picture: responseMe.picture,
                userID: response.authResponse.userID,
                sourceConnectedDevice: SourceProvider.FACEBOOK,
                idOneSignal: oneSignalId,
              };
              dispatch(loginWithFacebook({ ...requestData }));
            }
          );
        }
      },
      { scope: 'public_profile, email' }
    );
  }, []);

  return (
    <Slide direction="up" in={startAnimation} mountOnEnter unmountOnExit>
      <Container maxWidth="xl">
        <Grid
          container
          style={{
            paddingTop: 10,
          }}
        >
          <Grid item sm={4}></Grid>
          <Grid item xs={12} sm={6}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
                SRF
              </Link>
              <Typography color="text.primary">
                {t<string>('signin.title_page_signin')}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 5, pb: 5 }}>
          <Grid item xs={4}></Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            md-offset={3}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t<string>('signin.title_page_signin')}
              </Typography>

              <Box sx={{ mt: 1, pb: 2 }}>
                <form onSubmit={formik.handleSubmit} data-testid="login-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>('common.label_email')}
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          color="secondary"
                          type="email"
                          label={t<string>('common.label_email')}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          inputProps={{
                            'data-testid': 'email',
                          }}
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.email && formik.errors.email}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>('common.label_password')}
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          name="password"
                          color="secondary"
                          type={showPassword.showPassword ? 'text' : 'password'}
                          label={t<string>('common.label_password')}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          inputProps={{
                            'data-testid': 'password',
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.password && formik.errors.password}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={checkedRememberMe}
                        onChange={handleChangeChecked}
                      />
                    }
                    label={t('signin.label_remember_me').toString()}
                    onChange={formik.handleChange}
                  />

                  <LoadingButton
                    loading={loading}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t<string>('signin.label_login')}
                  </LoadingButton>
                </form>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ mt: 2 }}
                    >
                      <Link to={ALL_APP_ROUTES.FORGOT_PASSWORD_INIT}>
                        {t<string>('signin.label_forgot_password')}
                      </Link>
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      component="p"
                      sx={{ mt: 2 }}
                    >
                      <Link to={ALL_APP_ROUTES.REGISTER}>
                        {t<string>('signin.label_register_account')}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Stack
              spacing={2}
              direction="row"
              sx={{ justifyContent: 'center', my: 4 }}
            >
              <Fab color="primary" aria-label="add" onClick={loginFB}>
                <FacebookIcon />
              </Fab>
              <Fab
                color="secondary"
                aria-label="google"
                sx={{ m: 1, backgroundColor: '#E93F2E' }}
              >
                <GoogleSignin
                  isOneTap={false}
                  handleCredentialResponse={responseGoogle}
                />
                <GoogleIcon />
              </Fab>
            </Stack>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </Slide>
  );
}
