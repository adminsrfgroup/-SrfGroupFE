import React from 'react';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs/Breadcrumbs';
import Typography from '@mui/material/Typography/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Box from '@mui/material/Box/Box';
import i18n from 'i18next';
import { ALL_APP_ROUTES } from '../../../core/config/all-app-routes';
import { useDispatch, useSelector } from 'react-redux';
import { allAboutUsSelector, fetchAboutUs } from '../store/slice';

export default function AboutUs() {
  const [defaultLanguage, setDefaultLanguage] = React.useState('fr');
  const dispatch = useDispatch();
  const { entity, loading } = useSelector(allAboutUsSelector);

  const handleLanguageChanged = React.useCallback(() => {
    dispatch(fetchAboutUs({}));
  }, []);

  React.useEffect(() => {
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [handleLanguageChanged]);

  React.useEffect(() => {
    if (!entity) {
      dispatch(fetchAboutUs({}));
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{
          paddingTop: 10,
        }}
      >
        <Grid item xs={12} sm={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">AboutUs</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          paddingTop: 50,
        }}
      >
        {loading ? (
          <Grid item xs={12}>
            <Box sx={{ paddingTop: 10, textAlign: 'center' }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        ) : <Grid item xs={12}>
          <Box dangerouslySetInnerHTML={{__html: entity}}></Box>
        </Grid>}

      </Grid>
    </Container>
  );
}
