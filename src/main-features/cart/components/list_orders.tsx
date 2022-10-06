import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "react-i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import {useDispatch} from "react-redux";
import {Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ListOrders() {

    const [valueTab, setValueTab] = React.useState<number>(0);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
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
                            {t<string>("order.title_order")}
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>

            <Box  sx={{ mt: 3 }}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example"
                          textColor="secondary"
                          indicatorColor="secondary">
                        <Tab label={t<string>('order.label_success')} {...a11yProps(0)} color="secondary"/>
                        <Tab label={t<string>('order.label_failure')} {...a11yProps(1)} color="secondary"/>
                    </Tabs>
                </Box>
                <TabPanel value={valueTab} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                    Item Two
                </TabPanel>
            </Box>
        </Container>
    );
}
