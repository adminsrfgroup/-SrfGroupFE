import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import {Link, useNavigate} from "react-router-dom";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";
import Container from "@mui/material/Container/Container";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

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

export default function ListLocation() {
    const [value, setValue] = React.useState(0);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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

            <Box sx={{ mt: 5 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}
                          aria-label="basic tabs example"
                          textColor="secondary"
                          indicatorColor="secondary">
                        <Tab label="Demande envoyée" {...a11yProps(0)} />
                        <Tab label="Demande reçu" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Box>

        </Container>

    );
}
