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
import {useDispatch, useSelector} from "react-redux";
import {entitiesCart, fetchCart, loadingEntitiesCart, resetOrder, totalPagesOrder} from "../../cart/store/slice";
import {
    entitiesReceivedRentRequest,
    entitiesSentRentRequest,
    fetchRentRequestsReceived,
    fetchRentRequestsSent,
    loadingEntitiesReceivedRentRequest,
    loadingEntitiesSentRentRequest,
    resetRentRequestsSent,
    resetRentRequestsReceived,
    totalItemsReceivedRentRequest,
    totalItemsSentRentRequest,
    activePageSentRentRequest,
    setActivePageSentRentRequest,
    totalPagesSentRentRequest, activePageReceivedRentRequest, totalPagesReceivedRentRequest, setActivePageReceivedRentRequest
} from "../store/slice";
import {AllAppConfig} from "../../../core/config/all-config";
import { IRentRequest } from "../../../shared/model/rent_request.model";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {getBaseImageUrl, getFullnameUser, getImageForOffer, getUserAvatar} from "../../../shared/utils/utils-functions";
import CardContent from "@mui/material/CardContent/CardContent";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Avatar from "@mui/material/Avatar/Avatar";
import {InputQuantity} from "../../../shared/components/input-quantity/InputQuantity";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card/Card";
import {ConvertReactTimeAgo} from "../../../shared/pages/react-time-ago";
import {ButtonGroup} from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import Alert from "@mui/material/Alert/Alert";
import Skeleton from "@mui/material/Skeleton/Skeleton";

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
                <Box sx={{ pt: 3 }}>
                    <Box>{children}</Box>
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
                            {t<string>("header.label_rent_request")}
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
                    <ListRentRequestSent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListRentRequestReceiver />
                </TabPanel>
            </Box>

        </Container>

    );
}

function ListRentRequestSent() {

    const [isFirstTime, setIsFirstTime] = React.useState(true);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loadingEntitiesSentRentRequestSelector = useSelector(loadingEntitiesSentRentRequest) ?? false;
    const entitiesSentRentRequestSelector = useSelector(entitiesSentRentRequest) ?? [];
    const totalItemsSentRentRequestSelector = useSelector(totalItemsSentRentRequest) ?? 0;
    const activePageSentRentRequestSelector = useSelector(activePageSentRentRequest) ?? -1;
    const totalPagesSentRentRequestSelector = useSelector(totalPagesSentRentRequest) ?? -1;

    const resetAll = () => {
        dispatch(resetRentRequestsSent({}));
        dispatch(setActivePageSentRentRequest(0));
    };

    React.useEffect(() => {
        if( isFirstTime && entitiesSentRentRequestSelector.length === 0 ){
            setIsFirstTime(false);
            resetAll();
        }
    }, [isFirstTime]);

    React.useEffect(() => {
        if (activePageSentRentRequestSelector >= 0 && !isFirstTime) {
            dispatch(
                fetchRentRequestsSent({
                    page: activePageSentRentRequestSelector,
                    size: AllAppConfig.RENT_REQUEST_PER_PAGE,
                    queryParams: '',
                })
            );
        }
    }, [activePageSentRentRequestSelector, isFirstTime]);

    const rediretTo = () => {
        setTimeout(() => {
            // navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + cart?.sellOffer?.id);
        }, 300);
    };

    const loadMore = () => {
        setIsFirstTime(false);
        dispatch(setActivePageSentRentRequest(activePageSentRentRequestSelector + 1));
    };

    return (
        <Box>
            <InfiniteScroll
                pageStart={activePageSentRentRequestSelector}
                loadMore={loadMore}
                hasMore={totalPagesSentRentRequestSelector - 1 > activePageSentRentRequestSelector}
                loader={<div className="loader" key={0}></div>}
                threshold={0}
                initialLoad={false}
            >
                {
                    entitiesSentRentRequestSelector.map((item: IRentRequest, index: number) => (
                        <Box key={index} sx={{mb: 2}}>
                            <DisplayItemSent item={item}/>
                        </Box>
                    ))
                }

                {
                    loadingEntitiesSentRentRequestSelector ? <LoadingRentRequest /> : null
                }
            </InfiniteScroll>

            {
                !loadingEntitiesSentRentRequestSelector && entitiesSentRentRequestSelector?.length==0 ?
                    <Grid item xs={12} md={6}>
                        <Alert severity="warning">{t<string>("rentrequest.no_rentrequest_founds")}</Alert>
                    </Grid> : null
            }


        </Box>
    )
}


function ListRentRequestReceiver() {

    const [isFirstTime, setIsFirstTime] = React.useState(true);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loadingEntitiesReceivedRentRequestSelector = useSelector(loadingEntitiesReceivedRentRequest) ?? false;
    const entitiesReceivedRentRequestSelector = useSelector(entitiesReceivedRentRequest) ?? [];
    const totalItemsReceivedRentRequestSelector = useSelector(totalItemsReceivedRentRequest) ?? 0;
    const activePageReceivedRentRequestSelector = useSelector(activePageReceivedRentRequest) ?? -1;
    const totalPagesReceivedRentRequestSelector = useSelector(totalPagesReceivedRentRequest) ?? -1;

    const resetAll = () => {
        dispatch(resetRentRequestsReceived({}));
        dispatch(setActivePageReceivedRentRequest(0));
    };

    React.useEffect(() => {
        if( isFirstTime && entitiesReceivedRentRequestSelector.length === 0 ){
            setIsFirstTime(false);
            resetAll();
        }
    }, []);


    React.useEffect(() => {
        if (activePageReceivedRentRequestSelector >= 0 && !isFirstTime) {
            dispatch(
                fetchRentRequestsReceived({
                    page: activePageReceivedRentRequestSelector,
                    size: AllAppConfig.RENT_REQUEST_PER_PAGE,
                    queryParams: '',
                })
            );
        }
    }, [activePageReceivedRentRequestSelector, isFirstTime]);

    const loadMore = () => {
        setIsFirstTime(false);
        dispatch(setActivePageReceivedRentRequest(activePageReceivedRentRequestSelector + 1));
    };

    return (
        <Box>
            <InfiniteScroll
                pageStart={activePageReceivedRentRequestSelector}
                loadMore={loadMore}
                hasMore={totalPagesReceivedRentRequestSelector - 1 > activePageReceivedRentRequestSelector}
                loader={<div className="loader" key={0}></div>}
                threshold={0}
                initialLoad={false}
            >
                {
                    entitiesReceivedRentRequestSelector.map((item: IRentRequest, index: number) => (
                        <Box key={index} sx={{mb: 2}}>
                            <DisplayItemReceived item={item}/>
                        </Box>
                    ))
                }

                {
                    loadingEntitiesReceivedRentRequestSelector ? <LoadingRentRequest /> : null
                }
            </InfiniteScroll>

            {
                !loadingEntitiesReceivedRentRequestSelector && entitiesReceivedRentRequestSelector?.length==0 ?
                    <Grid item xs={12} md={6}>
                        <Alert severity="warning">{t<string>("rentrequest.no_rentrequest_founds")}</Alert>
                    </Grid> : null
            }
        </Box>
    )
}


function DisplayItemSent({item}: {item: IRentRequest}) {

    const { t } = useTranslation();

    const rediretTo = () => {
        setTimeout(() => {
            // navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + cart?.sellOffer?.id);
        }, 300);
    };

    return (
        <Box>
            <Card
                sx={{ display: { xs: "block", sm: "flex" } }}
                onClick={() => rediretTo()}
            >
                <CardMedia
                    sx={{
                        width: { xs: "100%", sm: 250 },
                        height: { xs: "100%", sm: 200 },
                    }}
                >
                    { item?.rentOffer?.offerImages?.length ? (
                        <LazyLoadImage
                            alt="Image offer"
                            src={getImageForOffer(
                                item?.rentOffer?.id,
                                item?.rentOffer?.offerImages[0].path
                            )}
                            placeholder={
                                <img
                                    src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING)}
                                    className="img-lazy-loading"
                                    alt="image srfgroup"
                                />
                            }
                            placeholderSrc={getBaseImageUrl(
                                AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                            )}
                            onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE);
                            }}
                            className="img-lazy-loading"
                        />
                    ) : (
                        <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                            <img
                                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                                className="img-lazy-loading"
                                alt="image not found"
                            />
                        </Box>
                    )}
                </CardMedia>
                <CardContent sx={{ flex: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <CardHeader
                                sx={{pl: 0, pt: 0}}
                                avatar={
                                    <Avatar
                                        role="img"
                                        aria-label="Image avatar"
                                        src={getUserAvatar(
                                            item?.receiverUser?.id,
                                            item.receiverUser?.imageUrl,
                                            item.receiverUser?.sourceConnectedDevice
                                        )}
                                        alt="image not found"
                                    >
                                        {getFullnameUser(item?.receiverUser)?.charAt(0)}
                                    </Avatar>
                                }
                                title={getFullnameUser(item?.receiverUser)}
                                subheader={item?.rentOffer?.title}
                            />


                            {/*<ButtonGroup sx={{ my: 1 }} variant="contained" aria-label="outlined primary button group">*/}
                            {/*    <Button variant="outlined" color="neutral">*/}
                            {/*        {t<string>("rentrequest.label_btn_refused")}*/}
                            {/*    </Button>*/}
                            {/*    <Button variant="outlined" color="success">*/}
                            {/*        {t<string>("rentrequest.label_btn_accept")}*/}
                            {/*    </Button>*/}
                            {/*</ButtonGroup>*/}

                        </Grid>

                        <Grid item xs={4}>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                {item.status}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                <ConvertReactTimeAgo
                                    convertDate={
                                        item?.rentOffer?.dateCreated
                                    }
                                />
                            </Typography>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </Box>
    )
}



function DisplayItemReceived({item}: {item: IRentRequest}) {

    const { t } = useTranslation();

    const rediretTo = () => {
        setTimeout(() => {
            // navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + cart?.sellOffer?.id);
        }, 300);
    };

    const cancelAction = () => {
        console.log('cancel');
    }

    return (
        <Box>
            <Card
                sx={{ display: { xs: "block", sm: "flex" } }}
                onClick={() => rediretTo()}
            >
                <CardMedia
                    sx={{
                        width: { xs: "100%", sm: 250 },
                        height: { xs: "100%", sm: 200 },
                    }}
                >
                    { item?.rentOffer?.offerImages?.length ? (
                        <LazyLoadImage
                            alt="Image offer"
                            src={getImageForOffer(
                                item?.rentOffer?.id,
                                item?.rentOffer?.offerImages[0].path
                            )}
                            placeholder={
                                <img
                                    src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING)}
                                    className="img-lazy-loading"
                                    alt="image srfgroup"
                                />
                            }
                            placeholderSrc={getBaseImageUrl(
                                AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                            )}
                            onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE);
                            }}
                            className="img-lazy-loading"
                        />
                    ) : (
                        <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                            <img
                                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                                className="img-lazy-loading"
                                alt="image not found"
                            />
                        </Box>
                    )}
                </CardMedia>
                <CardContent sx={{ flex: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <CardHeader
                                sx={{pl: 0, pt: 0}}
                                avatar={
                                    <Avatar
                                        role="img"
                                        aria-label="Image avatar"
                                        src={getUserAvatar(
                                            item?.receiverUser?.id,
                                            item.receiverUser?.imageUrl,
                                            item.receiverUser?.sourceConnectedDevice
                                        )}
                                        alt="image not found"
                                    >
                                        {getFullnameUser(item?.receiverUser)?.charAt(0)}
                                    </Avatar>
                                }
                                title={getFullnameUser(item?.receiverUser)}
                                subheader={item?.rentOffer?.title}
                            />


                            <ButtonGroup sx={{ my: 1 }} variant="contained" aria-label="outlined primary button group">
                                <Button variant="outlined" color="neutral" onClick={cancelAction}>
                                    {t<string>("rentrequest.label_btn_refused")}
                                </Button>
                                <Button variant="outlined" color="success">
                                    {t<string>("rentrequest.label_btn_accept")}
                                </Button>
                            </ButtonGroup>

                        </Grid>

                        <Grid item xs={4}>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                {item.status}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                <ConvertReactTimeAgo
                                    convertDate={
                                        item?.rentOffer?.dateCreated
                                    }
                                />
                            </Typography>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </Box>
    )
}

function LoadingRentRequest() {
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
