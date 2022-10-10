import * as React from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {useTranslation} from "react-i18next";

export default function AddRentDetailsOffer(){

    const { t } = useTranslation();

    return (
        <Box>
            <Box sx={{ my: 2 }} display="flex" justifyContent="center">
                <LoadingButton
                    loading={false}
                    fullWidth
                    variant="contained"
                    color="secondary"
                >
                    {t<string>("details_offer.label_button_add_rent")}
                </LoadingButton>
            </Box>
        </Box>
    )
}
