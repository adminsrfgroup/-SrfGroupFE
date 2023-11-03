import React, { useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab/Fab';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '@mui/material/Breadcrumbs/Breadcrumbs';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container/Container';
import { useTranslation } from 'react-i18next';
import { allLoginSelector, allSessionSelector, loginWithFacebook, loginWithGoogle, loginUser } from '../../store/slice';
import { initialValuesSignIn } from '../../validation/validation-signin';
import { IFacebook, IGooglePlus } from '../../../../shared/model/user.model';
import { SourceProvider } from '../../../../shared/enums/source-provider';
import { ALL_APP_ROUTES } from '../../../../core/config/all-app-routes';
import Stack from '@mui/material/Stack';
import { GoogleSignin } from '../../../../shared/components/google-signin/google-signin';
import { decodeJwtResponse } from '../../../../shared/utils/utils-functions';
import './sign-in.scss';
import { SignInForm } from './signin-form';

const initialValues = initialValuesSignIn;

export default function SignIn() {
    const [startAnimation, setStartAnimation] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState({
        showPassword: false,
    });
    const [checkedRememberMe, setCheckedRememberMe] = React.useState<boolean>(true);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { loading } = useSelector(allLoginSelector);
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

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: validationSchemaSignIn,
    //     onSubmit: (values) => {
    //         dispatch(
    //             loginUser({
    //                 email: values.email.toString(),
    //                 password: values.password.toString(),
    //                 oneSignalId: oneSignalId,
    //                 rememberMe: checkedRememberMe,
    //             })
    //         );
    //     },
    // });

    const onSubmit = (values: any) => {
        dispatch(
            loginUser({
                email: values.email.toString(),
                password: values.password.toString(),
                oneSignalId: oneSignalId,
                rememberMe: checkedRememberMe,
            })
        );
    };

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

    // const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setCheckedRememberMe(event.target.checked);
    // };

    // const logoutFB = useCallback(() => {
    //   FB.logout((response: any) => {
    //     console.log('FB logout');
    //   });
    // }, [])

    const loginFB = useCallback(() => {
        FB.login(
            (response: any) => {
                if (response.status === 'connected') {
                    FB.api('/me', { fields: 'id,name,email,picture' }, (responseMe: any) => {
                        const requestData: IFacebook = {
                            accessToken: response.authResponse.accessToken,
                            data_access_expiration_time: response.authResponse.data_access_expiration_time,
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
                    });
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
                            <Typography color="text.primary">{t<string>('signin.title_page_signin')}</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <Grid container sx={{ pt: 5, pb: 5 }}>
                    <Grid item xs={4}></Grid>

                    <Grid item xs={12} sm={8} md={4} component={Paper} md-offset={3} elevation={6} square>
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

                            <SignInForm onSubmit={onSubmit} loading={loading} />
                        </Box>

                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'center', my: 4 }} data-testid="signin-social-media">
                            <Fab color="primary" aria-label="add" onClick={loginFB}>
                                <FacebookIcon />
                            </Fab>
                            <Fab color="secondary" aria-label="google" sx={{ m: 1, backgroundColor: '#E93F2E' }}>
                                <GoogleSignin isOneTap={false} handleCredentialResponse={responseGoogle} />
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
