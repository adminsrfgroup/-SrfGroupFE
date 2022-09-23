import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { OrderCart } from "./ui-segments/order-cart";
import { FormCart } from "./ui-segments/form-cart";
import { PassOrder } from "./ui-segments/pass-order";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsCart,
  entitiesCart,
  fetchCart,
  loadingEntitiesCart,
} from "../store/slice";
import Alert from "@mui/material/Alert/Alert";
import DetailsCart from "./ui-segments/details-order";

const steps = [
  "Valider la commande",
  "Confirmer la commande",
  "Passer la commande",
];
export default function Cart() {
  const [activeStep, setActiveStep] = React.useState(0);

  const loadingEntitiesCartSelector = useSelector(loadingEntitiesCart) ?? false;
  const entitiesCartSelector = useSelector(entitiesCart) ?? [];

  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchCart({
        page: 0,
        size: 20,
        queryParams: "",
      })
    );

    dispatch(detailsCart({}));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const actionDetailsCart = (values: any) => {
    console.log("values ", values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{
          paddingTop: 10,
        }}
      >
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">
              {t<string>("header.label_cart")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {entitiesCartSelector.length === 0 && !loadingEntitiesCartSelector ? (
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="error">{t<string>("cart.list_not_found")}</Alert>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === 0 ? (
                <OrderCart
                  nextStepHandler={handleNext}
                  entitiesCart={entitiesCartSelector}
                  loadingEntitiesCart={loadingEntitiesCartSelector}
                />
              ) : activeStep === 1 ? (
                <FormCart submitHandler={actionDetailsCart} />
              ) : (
                <PassOrder />
              )}
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    color="neutral"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {t<string>("cart.label_back_order")}
                  </Button>
                </Box>
              </React.Fragment>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" color="text.secondary">
              Votre commande
            </Typography>
            <DetailsCart
              activeStep={activeStep}
              submitHandler={actionDetailsCart}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
