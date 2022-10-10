import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography/Typography";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import Alert from "@mui/material/Alert/Alert";
import i18n from "i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { useDispatch, useSelector } from "react-redux";
import { allAboutUsSelector, fetchAboutUs } from "../store/slice";
import isEmpty from "lodash/isEmpty";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function AboutUs() {
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const dispatch = useDispatch();
  const { entity, loading } = useSelector(allAboutUsSelector);

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });

    if (isEmpty(entity)) {
      dispatch(fetchAboutUs({}));
    }

    // getEntitiyAboutUs();
  }, []);

  React.useEffect(() => {
    if (entity) {
      getContentByLang();
    }
  }, [entity]);

  const getContentByLang = (): string => {
    if (defaultLanguage === "en") {
      return entity.contentEn || "";
    } else if (defaultLanguage === "fr") {
      return entity.contentFr || "";
    }
    return entity.contentAr || "";
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

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
            <Box sx={{ paddingTop: 10, textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        ) : null}

        <Grid item xs={12}>
          {entity && entity.contentEn ? (
            <Box dangerouslySetInnerHTML={{ __html: getContentByLang() }}></Box>
          ) : (
            <Alert severity="warning">No About Us found</Alert>
          )}
        </Grid>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Age</InputLabel>
          <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

      </Grid>
    </Container>
  );
}
