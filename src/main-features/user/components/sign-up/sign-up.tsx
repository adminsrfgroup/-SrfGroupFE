import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Breadcrumbs from '@mui/material/Breadcrumbs/Breadcrumbs';
import Slide from '@mui/material/Slide';
import {
  initialValuesSignUp,
  validationSchemaSignUp,
} from './validation/validation-signup';
import { connect, useDispatch, useSelector } from 'react-redux';
import Dialog, { DialogProps } from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import Container from '@mui/material/Container/Container';
// import {TransitionModal} from "../../shared/pages/transition-modal";
import { useTranslation } from 'react-i18next';
import { decodeJwtResponse } from '../../../../shared/utils/utils-functions';
// import { loadingCommentsOffer } from "../../../offer/store/slice";
import {
  addSuccessRegister,
  allLocaleSelector,
  allSessionSelector,
  entityCgu,
  fetchCgu,
  loadingCgu,
  loadingRegister,
  loginWithFacebook,
  loginWithGoogle,
  registerUser,
  resetRegisterUser,
} from '../../store/slice';
import { TransitionModal } from '../../../../shared/pages/transition-modal';
import { ALL_APP_ROUTES } from '../../../../core/config/all-app-routes';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
// import FacebookLogin from "react-facebook-login";
import FacebookIcon from '@mui/icons-material/Facebook';
// import { GoogleLogin } from "react-google-login";
// import { AllAppConfig } from "../../../../core/config/all-config";
import Fab from '@mui/material/Fab/Fab';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import { IFacebook, IGooglePlus } from '../../../../shared/model/user.model';
import { SourceProvider } from '../../../../shared/enums/source-provider';
import './sign-up.scss';
import { GoogleSignin } from '../../../../shared/components/google-signin/google-signin';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const initialValues = initialValuesSignUp;

interface ISignUP {
  accept: boolean;
  email: string;
  firstPassword: string;
  secondPassword: string;
}

export default function SignUp() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    showPassword: false,
  });
  const [showConfPassword, setShowConfPassword] = React.useState({
    showPassword: false,
  });
  const [openDialogRegister, setOpenDialogRegister] = React.useState(false);

  const [openCGU, setOpenCGU] = React.useState(false);
  const [scrollCGU, setScrollCGU] =
    React.useState<DialogProps['scroll']>('paper');

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingRegisterSelector = useSelector(loadingRegister) ?? false;
  const addSuccessRegisterSelector = useSelector(addSuccessRegister) ?? false;
  const loadingCguSelector = useSelector(loadingCgu) ?? false;
  const entityCguSelector = useSelector(entityCgu) ?? {};

  const { oneSignalId } = useSelector(allSessionSelector);
  // const { currentLocale } = useSelector(allLocaleSelector);

  React.useEffect(() => {
    setStartAnimation(true);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaSignUp,
    onSubmit: (values: ISignUP) => {
      dispatch(
        registerUser({
          email: values.email,
          password: values.firstPassword,
          oneSignalId: oneSignalId,
        })
      );
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword({
      showPassword: !showPassword.showPassword,
    });
  };

  const handleClickShowConfPassword = () => {
    setShowConfPassword({
      showPassword: !showConfPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (addSuccessRegisterSelector) {
      setOpenDialogRegister(true);
    }
  }, [addSuccessRegisterSelector]);

  const handleClose = () => {
    setOpenDialogRegister(false);
    dispatch(resetRegisterUser({}));
    formik.resetForm();
    navigate(ALL_APP_ROUTES.LOGIN);
  };

  const handleClickOpen = (scrollType: DialogProps['scroll']) => {
    setOpenCGU(true);
    setScrollCGU(scrollType);
    dispatch(fetchCgu({}));
  };

  const handleCloseCGU = (response: boolean) => {
    setOpenCGU(false);

    if (!response) {
      formik.setFieldValue('accept', false);
    }
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (openCGU) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCGU]);
  const showDialogCGU = () => {
    return (
      <Box>
        <Dialog
          open={openCGU}
          onClose={handleCloseCGU}
          scroll={scrollCGU}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            {t<string>('signup.title_dialog_cgu')}
          </DialogTitle>
          <DialogContent dividers={scrollCGU === 'paper'}>
            {loadingCguSelector ? (
              <Box sx={{ pt: 5, textAlign: 'center' }}>
                <CircularProgress color="inherit" />
              </Box>
            ) : null}

            <div
              dangerouslySetInnerHTML={{
                __html: entityCguSelector.contentFr || '',
              }}
            ></div>
          </DialogContent>
          <DialogActions>
            <Button color="neutral" onClick={() => handleCloseCGU(false)}>
              {t<string>('common.label_cancel')}
            </Button>
            <Button color="secondary" onClick={() => handleCloseCGU(true)}>
              {t<string>('signup.label_accept_cgu')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  const shwDialogRegister = () => {
    return (
      <Dialog
        open={openDialogRegister}
        TransitionComponent={TransitionModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t<string>('signup.title-dialog-register')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t<string>('signup.inbox-dialog-register')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="success">
            {t<string>('signup.label-activation-dialog-register')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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

  const handleChangeCGU = (value: any) => {
    formik.handleChange(value);
    if (value.target.checked) {
      handleClickOpen('paper');
    }
  };

  return (
    <Slide direction="up" in={startAnimation} mountOnEnter unmountOnExit>
      <Container maxWidth="xl">
        <Grid
          container
          style={{
            paddingTop: 10,
          }}
        >
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
                SRF
              </Link>
              <Typography color="text.primary">
                {t<string>('signup.title-page-register')}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 5, pb: 5 }}>
          <Grid item xs={3}></Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
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
                {t<string>('signup.title-page-register')}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <form onSubmit={formik.handleSubmit}>
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
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormHelperText id="component-helper-text">
                            {t<string>('signup.label_email_required')}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.firstPassword &&
                          Boolean(formik.errors.firstPassword)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>('common.label_new_password')}
                        </InputLabel>
                        <OutlinedInput
                          id="firstPassword"
                          name="firstPassword"
                          color="secondary"
                          type={showPassword.showPassword ? 'text' : 'password'}
                          label={t<string>('common.label_new_password')}
                          value={formik.values.firstPassword}
                          onChange={formik.handleChange}
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
                        {formik.touched.firstPassword &&
                        formik.errors.firstPassword ? (
                          <FormHelperText id="component-helper-text">
                            {t<string>('signup.label_new_password')}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.secondPassword &&
                          Boolean(formik.errors.secondPassword)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>('common.label_confirm_password')}
                        </InputLabel>
                        <OutlinedInput
                          id="secondPassword"
                          name="secondPassword"
                          color="secondary"
                          type={
                            showConfPassword.showPassword ? 'text' : 'password'
                          }
                          label={t<string>('common.label_confirm_password')}
                          value={formik.values.secondPassword}
                          onChange={formik.handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showConfPassword.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {formik.touched.secondPassword &&
                        formik.errors.secondPassword ? (
                          <FormHelperText id="component-helper-text">
                            {t<string>('signup.label_second_password')}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(formik.errors.accept)}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="accept"
                              name="accept"
                              color="secondary"
                              checked={formik.values.accept}
                              onChange={handleChangeCGU}
                            />
                          }
                          label={
                            <React.Fragment>
                              {t<string>('signup.accept-cgu')}
                            </React.Fragment>
                          }
                        />
                        {formik.touched.accept && formik.errors.accept ? (
                          <FormHelperText id="component-helper-text">
                            {t<string>('signup.label_required_accept_cgu')}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <LoadingButton
                    loading={loadingRegisterSelector}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t<string>('common.label_register')}
                  </LoadingButton>

                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to={ALL_APP_ROUTES.LOGIN}>
                        {t<string>('signup.label-already-have-account')}
                      </Link>
                    </Grid>
                  </Grid>

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
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        {shwDialogRegister()}
        {showDialogCGU()}
      </Container>
    </Slide>
  );
}
