import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "react-i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert/Alert";
import {
    entitiesOrder,
    fetchOrder, resetOrder,
    loadingEntitiesOrder,
    totalPagesOrder
} from "../store/slice";
import Card from "@mui/material/Card/Card";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import {getBaseImageUrl, getFullUrlWithParams, getImageForOffer} from "../../../shared/utils/utils-functions";
import {AllAppConfig} from "../../../core/config/all-config";
import CardContent from "@mui/material/CardContent/CardContent";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ConvertReactTimeAgo} from "../../../shared/pages/react-time-ago";
import Accordion from "@mui/material/Accordion";
import {AccordionSummary} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import {StatusOrder} from "../../../shared/enums/order.enum";
import InfiniteScroll from "react-infinite-scroller";
import {fetchMyOffers, resetMyOffers, totalPagesMyOffers} from "../../offer/store/slice";
import queryString from "query-string";


function LoadingOrders() {
    return (
        <Box>
            {[0, 1, 2].map((key) => (
                <Card sx={{ display: { xs: "block", sm: "flex" }, my: 2 }} key={key}>
                    <CardMedia
                        sx={{
                            width: { xs: "100%", sm: 250 },
                            height: { xs: "100%", sm: 200 },
                        }}
                    >
                        <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                            <img
                                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                                className="img-lazy-loading"
                                alt="image not found"
                            />
                        </Box>
                    </CardMedia>
                    <CardContent sx={{ flex: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" height={24} />

                                <Skeleton animation="wave" height={24} />

                                <Skeleton
                                    variant="rectangular"
                                    width={"100%"}
                                    height={100}
                                    sx={{ my: 3 }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

function ItemOrder({item}: {item: any}) {

    const { t } = useTranslation();
    return (
        <Box>
            <Card
                sx={{ display: { xs: "block", sm: "flex" } }}>
                <CardContent sx={{ flex: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography
                                component="h4"
                                variant="h4"
                                sx={{ fontSize: "1.2rem" }}
                            >
                                <ConvertReactTimeAgo
                                    convertDate={
                                        item?.passedDate
                                    }
                                />
                            </Typography>

                            <Typography
                                component="h5"
                                variant="h5"
                                display="flex"
                            >
                                {item.paymentMode}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                display="flex"
                            >
                                Nombres des produits: {item.numberCarts}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                display="flex"
                            >
                                Frais de livraison = { item.taxDelivery }
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                display="flex"
                            >
                                Total des produits = { item.totalCarts.toLocaleString("tn-TN") } TND
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                display="flex"
                            >
                                Total TTC = { item.totalGlobalCarts.toLocaleString("tn-TN") } TND
                            </Typography>

                        </Grid>

                        <Grid item xs={4}>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                {
                                    item.status === StatusOrder.PASSED ? item.status : item.status
                                }
                            </Typography>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Accordion sx={{mt: '0 !important'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="bg-brown"
                >
                    <Typography>List des produits</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default function ListOrders() {


    const loadingEntitiesOrderSelector = useSelector(loadingEntitiesOrder) ?? false;
    const entitiesOrderSelector = useSelector(entitiesOrder) ?? [];
    const totalPagesOrderSelector = useSelector(totalPagesOrder) ?? 0;
    const [activePage, setActivePage] = React.useState(-1);

    const { t } = useTranslation();
    const dispatch = useDispatch();


    const resetAll = () => {
        dispatch(resetOrder({}));
        setActivePage(0);
    };

    React.useEffect(() => {
        resetAll();
    }, []);

    React.useEffect(() => {
        if (activePage >= 0) {
            dispatch(
                fetchOrder({
                    page: activePage,
                    size: AllAppConfig.ORDERS_PER_PAGE,
                    queryParams: '',
                })
            );
        }
    }, [activePage]);

    const loadMore = () => {
        setActivePage(activePage + 1);
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

            <Box  sx={{ mt: 5 }}>

                <InfiniteScroll
                    pageStart={activePage}
                    loadMore={loadMore}
                    hasMore={totalPagesOrderSelector - 1 > activePage}
                    loader={<div className="loader" key={0}></div>}
                    threshold={0}
                    initialLoad={false}
                >
                    {
                        entitiesOrderSelector?.map((item: any, index: number) =>(
                            <Box key={index} sx={{mb: 2}}><ItemOrder item={item}/></Box>
                        ))
                    }

                    {
                        loadingEntitiesOrderSelector ? <LoadingOrders /> : null
                    }
                </InfiniteScroll>

                {
                    !loadingEntitiesOrderSelector && entitiesOrderSelector?.length==0 ?
                            <Grid item xs={12} md={6}>
                                <Alert severity="warning">{t<string>("order.no_commandes_founds")}</Alert>
                            </Grid> : null
                }
            </Box>
        </Container>
    );
}
