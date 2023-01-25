import React from 'react';
import { Formik, Field, Form } from 'formik';
import { initialValuesSignIn, validationSchemaSignIn } from '../../validation/validation-signin';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export const SignInForm = ({ onSubmit, loading }: { onSubmit: any; loading: boolean }) => {
    const [showPassword, setShowPassword] = React.useState({
        showPassword: false,
    });
    const { t } = useTranslation();

    const handleClickShowPassword = () => {
        setShowPassword({
            showPassword: !showPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ mt: 1, pb: 2 }}>
            <Formik initialValues={initialValuesSignIn} validationSchema={validationSchemaSignIn} onSubmit={(values) => onSubmit(values)}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field name="email">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }: {
                                        field: any; // { name, value, onChange, onBlur }
                                        form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta: any;
                                    }) => (
                                        <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                                            <InputLabel htmlFor="email">{t<string>('common.label_email')}</InputLabel>
                                            <OutlinedInput
                                                id="email"
                                                name="email"
                                                color="secondary"
                                                type="email"
                                                label={t<string>('common.label_email')}
                                                aria-describedby="email-helper-text"
                                                {...field}
                                                inputProps={{
                                                    'data-testid': 'email',
                                                }}
                                            />
                                            {meta.touched && meta.error && (
                                                <FormHelperText id="email-helper-text" data-testid="email-helper-text">
                                                    {meta.error}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name="password">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }: {
                                        field: any; // { name, value, onChange, onBlur }
                                        form: { touched: any; errors: any }; // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta: any;
                                    }) => (
                                        <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
                                            <InputLabel htmlFor="password">{t<string>('common.label_password')}</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name="password"
                                                color="secondary"
                                                type={showPassword.showPassword ? 'text' : 'password'}
                                                label={t<string>('common.label_password')}
                                                aria-describedby="password-helper-text"
                                                {...field}
                                                inputProps={{
                                                    'data-testid': 'password',
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                            {showPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {meta.touched && meta.error && (
                                                <FormHelperText id="password-helper-text" data-testid="password-helper-text">
                                                    {meta.error}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    checked={values.rememberMe}
                                    onChange={() => setFieldValue('rememberMe', !values.rememberMe)}
                                    control={<Checkbox color="secondary" />}
                                    label={t<string>('signin.label_remember_me')}
                                />
                                <LoadingButton fullWidth variant="contained" color="secondary" type="submit" data-testid="submit" sx={{ mt: 3, mb: 2 }} loading={loading}>
                                    {t<string>('signin.label_login')}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};
