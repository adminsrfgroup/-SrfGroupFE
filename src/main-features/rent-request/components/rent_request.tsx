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
import {
    entitiesReceivedRentRequest,
    entitiesSentRentRequest,
    fetchRentRequestsReceived,
    fetchRentRequestsSent,
    loadingEntitiesReceivedRentRequest,
    loadingEntitiesSentRentRequest,
    resetRentRequestsSent,
    resetRentRequestsReceived,
    activePageSentRentRequest,
    setActivePageSentRentRequest,
    totalPagesSentRentRequest, activePageReceivedRentRequest, totalPagesReceivedRentRequest, setActivePageReceivedRentRequest, deleteSuccessSentRequest, deleteRentRequestsSent, refusedSuccessReceivedRentRequest, refusedRentRequestsReceived
} from "../store/slice";
import {AllAppConfig} from "../../../core/config/all-config";
import { IRentRequest } from "../../../shared/model/rent_request.model";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {getBaseImageUrl, getFullnameUser, getImageForOffer, getUserAvatar} from "../../../shared/utils/utils-functions";
import CardContent from "@mui/material/CardContent/CardContent";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Avatar from "@mui/material/Avatar/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card/Card";
import {ConvertReactTimeAgo} from "../../../shared/pages/react-time-ago";
import {ButtonGroup} from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import Alert from "@mui/material/Alert/Alert";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { StatusRentRequest } from "../../../shared/enums/rent_request.enum";
import Dialog from "@mui/material/Dialog/Dialog";
import {TransitionModal} from "../../../shared/pages/transition-modal";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import { IRentOffer } from "../../../shared/model/rent-offer.model";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {PeriodeRent} from "../../../shared/enums/type-offer.enum";
import DatePicker from "@mui/lab/DatePicker/DatePicker";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import {useFormik} from "formik";
import { initialValuesRentRequestReceived, validationSchemaRentRequestReceived } from "../validation/init-value-rent-request";
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from "react-signature-canvas";

import './rent_request.scss';
import IconButton from "@mui/material/IconButton";

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
                        <Tab label="Demande reçu" {...a11yProps(0)} />
                        <Tab label="Demande envoyée" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ListRentRequestReceiver />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListRentRequestSent />
                </TabPanel>
            </Box>

        </Container>

    );
}

function ListRentRequestSent() {

    const [isFirstTime, setIsFirstTime] = React.useState(true);
    const [openDeleteRentRequestModal, setOpenDeleteRentRequestModal] = React.useState(false);
    const [rentRequestTmp, setRentRequestTmp] = React.useState<IRentRequest>({});

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loadingEntitiesSentRentRequestSelector = useSelector(loadingEntitiesSentRentRequest) ?? false;
    const entitiesSentRentRequestSelector = useSelector(entitiesSentRentRequest) ?? [];
    // const totalItemsSentRentRequestSelector = useSelector(totalItemsSentRentRequest) ?? 0;
    const activePageSentRentRequestSelector = useSelector(activePageSentRentRequest) ?? -1;
    const totalPagesSentRentRequestSelector = useSelector(totalPagesSentRentRequest) ?? -1;
    const deleteSuccessSentRequestSelector = useSelector(deleteSuccessSentRequest) ?? false;

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

    const loadMore = () => {
        setIsFirstTime(false);
        dispatch(setActivePageSentRentRequest(activePageSentRentRequestSelector + 1));
    };

    const removeRentRequest = (event: any, rentRequest: IRentRequest) => {
        event.stopPropagation();
        setRentRequestTmp(rentRequest);
        setOpenDeleteRentRequestModal(true);
    }

    const handleClickCancelDeleteRentRequestModal =() => {
        setOpenDeleteRentRequestModal(false);
    }

    const handleClickDeleteDeleteRentRequestModal = () => {
        dispatch(deleteRentRequestsSent({id: rentRequestTmp.id}));
        setOpenDeleteRentRequestModal(false);
    }

    React.useEffect(() => {
        if( deleteSuccessSentRequestSelector ){
            resetAll();
            dispatch(setActivePageSentRentRequest(0));
            dispatch(
                fetchRentRequestsSent({
                    page: 0,
                    size: AllAppConfig.RENT_REQUEST_PER_PAGE,
                    queryParams: '',
                })
            );
        }
    }, [deleteSuccessSentRequestSelector]);

    const renderDialogDeleteRentRequest = () => {
        return (
            <Dialog
                open={openDeleteRentRequestModal}
                TransitionComponent={TransitionModal}
                keepMounted
                onClose={handleClickCancelDeleteRentRequestModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t<string>("rentrequest.title_dialog_delete_rentrequest")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t<string>("rentrequest.description_dialog_delete_rentrequest")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCancelDeleteRentRequestModal} color="neutral">
                        {t<string>("common.label_back")}
                    </Button>
                    <Button onClick={handleClickDeleteDeleteRentRequestModal} color="error">
                        {t<string>("common.label_cancel")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
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

                <Grid container spacing={4} sx={{mt: 3}}>

                    {
                        entitiesSentRentRequestSelector.map((item: IRentRequest, index: number) => (
                            <DisplayItemSent item={item} key={index} removeRentRequest={removeRentRequest}/>
                        ))
                    }

                    {
                        loadingEntitiesSentRentRequestSelector ? <LoadingRentRequest /> : null
                    }
                </Grid>
            </InfiniteScroll>

            {
                !loadingEntitiesSentRentRequestSelector && entitiesSentRentRequestSelector?.length==0 ?
                    <Grid item xs={12} md={6}>
                        <Alert severity="warning">{t<string>("rentrequest.no_rentrequest_founds")}</Alert>
                    </Grid> : null
            }

            {renderDialogDeleteRentRequest()}
        </Box>
    )
}


function ListRentRequestReceiver() {

    const [isFirstTime, setIsFirstTime] = React.useState(true);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loadingEntitiesReceivedRentRequestSelector = useSelector(loadingEntitiesReceivedRentRequest) ?? false;
    const entitiesReceivedRentRequestSelector = useSelector(entitiesReceivedRentRequest) ?? [];
    // const totalItemsReceivedRentRequestSelector = useSelector(totalItemsReceivedRentRequest) ?? 0;
    const activePageReceivedRentRequestSelector = useSelector(activePageReceivedRentRequest) ?? -1;
    const totalPagesReceivedRentRequestSelector = useSelector(totalPagesReceivedRentRequest) ?? -1;
    const refusedSuccessReceivedRentRequestSelector = useSelector(refusedSuccessReceivedRentRequest) ?? false;

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

    const refusedRentRequest = (item: IRentRequest) => {
        dispatch(refusedRentRequestsReceived({id: item.id}));
    }

    React.useEffect(() => {
        if( refusedSuccessReceivedRentRequestSelector ){
            resetAll();
            dispatch(setActivePageReceivedRentRequest(0));
            dispatch(
                fetchRentRequestsReceived({
                    page: 0,
                    size: AllAppConfig.RENT_REQUEST_PER_PAGE,
                    queryParams: '',
                })
            );
        }
    }, [refusedSuccessReceivedRentRequestSelector])

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
                <Grid container spacing={4} sx={{mt: 3}}>
                    {
                        entitiesReceivedRentRequestSelector.map((item: IRentRequest, index: number) => (
                            <DisplayItemReceived item={item} key={index} callbackRefusedRentRequest={refusedRentRequest}/>
                        ))
                    }

                    {
                        loadingEntitiesReceivedRentRequestSelector ? <LoadingRentRequest /> : null
                    }
                </Grid>
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


function DisplayItemSent({item, removeRentRequest}: {item: IRentRequest, removeRentRequest: any}) {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const rediretTo = (rentOffer: IRentOffer | undefined) => {
        setTimeout(() => {
            navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + rentOffer?.id);
        }, 300);
    };

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" >
                <Card
                    sx={{ display: { xs: "block", sm: "flex" } }}
                    onClick={() => rediretTo(item?.rentOffer)}
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

                                {
                                    item.status === StatusRentRequest.STANDBY ?
                                        <Button variant="outlined" color="error" onClick={(event) => removeRentRequest(event, item)}>
                                            {t<string>("rentrequest.label_btn_refused")}
                                        </Button> : null
                                }

                            </Grid>

                            <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <Typography
                                    variant="caption"
                                    color="secondary"
                                    display="flex"
                                    sx={{ justifyContent: "end" }}
                                >
                                    {t<string>("rentrequest."+item.status)}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="flex"
                                    sx={{ justifyContent: "end" }} >
                                    <ConvertReactTimeAgo
                                        convertDate={
                                            item?.sendDate
                                        }
                                    />
                                </Typography>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    )
}


const initialValues = initialValuesRentRequestReceived;
function DisplayItemReceived({item, callbackRefusedRentRequest}: {item: IRentRequest, callbackRefusedRentRequest: any}) {

    const [openCancelRentRequestModal, setOpenCancelRentRequestModal] = React.useState<boolean>(false);
    const [openAddSignatureRentRequestModal, setOpenAddSignatureRentRequestModal] = React.useState<boolean>(false);
    const [indexSelected, setIndexSelected] = React.useState<number>(-1);

    const [dataURL, setDataURL] = React.useState<string | null>(null);

    const padRef = React.useRef<SignatureCanvas>(null);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaRentRequestReceived,
        onSubmit: (values) => {
            console.log('values ', values);
            trim();
            // if (isAuthenticated) {
            //     saveEntity(values);
            // } else {
            //     // open();
            //     dispatch(showUnauthorizedModal({}));
            // }
        },
    });

    React.useEffect(() => {
        console.log('dataURL ', dataURL);
    }, [dataURL])
    const clear = () => {
        padRef.current?.clear();
    };

    const trim = () => {
        const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
        if (url) setDataURL(url);
    };

    const rediretTo = (rentOffer: IRentOffer | undefined) => {
        setTimeout(() => {
            // navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + rentOffer?.id);
        }, 300);
    };

    const cancelIndexAction = (event: any) => {
        event.stopPropagation();
        setIndexSelected(-1);
    }

    const acceptAction = (event: any, rentRequest: IRentRequest) => {
        event.stopPropagation();
        setIndexSelected(rentRequest.id || -1);

        formik.setFieldValue('amount', item?.rentOffer?.amount || '');
        formik.setFieldValue('startDate', item?.rentOffer?.startDate || '');
        formik.setFieldValue('endDate', item?.rentOffer?.endDate || '');
        formik.setFieldValue('typePeriodRent', item?.rentOffer?.typePeriodRent || '');
    }

    const cancelAction = (event: any, rentRequest: IRentRequest) => {
        event.stopPropagation();
        setOpenCancelRentRequestModal(true);
    }

    const handleClickCancelCancelRentRequestModal = () => {
        setOpenCancelRentRequestModal(false);
    }

    const handleClickDeleteDeleteRentRequestModal = () => {
        setOpenCancelRentRequestModal(false);
        callbackRefusedRentRequest(item);
    }

    const openModalSignature = () => {
        setOpenAddSignatureRentRequestModal(true);
    }

    const renderDialogCancelRentRequest = () => {
        return (
            <Dialog
                open={openCancelRentRequestModal}
                TransitionComponent={TransitionModal}
                keepMounted
                onClose={handleClickCancelCancelRentRequestModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t<string>("rentrequest.title_dialog_cancel_rentrequest")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t<string>("rentrequest.description_dialog_cancel_rentrequest")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCancelCancelRentRequestModal} color="neutral">
                        {t<string>("common.label_cancel")}
                    </Button>
                    <Button onClick={handleClickDeleteDeleteRentRequestModal} color="error">
                        {t<string>("rentrequest.label_btn_refused")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };


    const renderDialogAddSignatureRentRequest = () => {
        return (
            <Dialog
                open={openAddSignatureRentRequestModal}
                TransitionComponent={TransitionModal}
                keepMounted
                fullScreen
                onClose={handleClickCancelCancelRentRequestModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t<string>("rentrequest.title_dialog_cancel_rentrequest")}</DialogTitle>
                <DialogContent>
                    {/*<SignaturePad ref={padRef} canvasProps={{ className: "sigCanvas" }} />*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddSignatureRentRequestModal(false)} color="neutral">
                        {t<string>("common.label_cancel")}
                    </Button>
                    <Button onClick={handleClickDeleteDeleteRentRequestModal} color="error">
                        {t<string>("rentrequest.label_btn_refused")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <Grid item xs={12} md={6}>
            <Card
                sx={{ display: { xs: "block", sm: "flex" } }}
                onClick={() => rediretTo(item?.rentOffer)}>
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
                                            item?.senderUser?.id,
                                            item.senderUser?.imageUrl,
                                            item.senderUser?.sourceConnectedDevice
                                        )}
                                        alt="image not found"
                                    >
                                        {getFullnameUser(item?.senderUser)?.charAt(0)}
                                    </Avatar>
                                }
                                title={getFullnameUser(item?.senderUser)}
                                subheader={item?.rentOffer?.title}
                            />

                            {
                                item.status === StatusRentRequest.STANDBY  && indexSelected !== item.id ?
                                    <ButtonGroup sx={{ my: 1 }} variant="contained" aria-label="outlined primary button group">
                                        <Button variant="outlined" color="neutral" onClick={(event) => cancelAction(event, item)}>
                                            {t<string>("rentrequest.label_btn_refused")}
                                        </Button>
                                        <Button variant="outlined" color="success" onClick={(event) => acceptAction(event, item)}>
                                            {t<string>("rentrequest.label_btn_accept")}
                                        </Button>
                                    </ButtonGroup> : null
                            }

                        </Grid>

                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                            <Typography
                                variant="caption"
                                color="secondary"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                {t<string>("rentrequest."+item.status)}
                            </Typography>
                            <Typography
                                variant="caption"
                                display="flex"
                                sx={{ justifyContent: "end" }}
                            >
                                <ConvertReactTimeAgo
                                    convertDate={
                                        item?.sendDate
                                    }
                                />
                            </Typography>
                        </Grid>

                    </Grid>

                    <form onClick={(event) => event.stopPropagation()} onSubmit={formik.handleSubmit} >
                        {
                            indexSelected === item.id ?
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={2} sx={{ my: 2 }}>
                                        <Grid item xs={12} md={6}>
                                            <FormControl
                                                fullWidth
                                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                                size="small"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-amount" color="secondary">Amount</InputLabel>
                                                <OutlinedInput
                                                    id="amount"
                                                    type="number"
                                                    color="secondary"
                                                    value={formik.values.amount}
                                                    onChange={formik.handleChange}
                                                    label="Amount"
                                                />
                                                <FormHelperText id="component-helper-text">
                                                    {formik.touched.amount && formik.errors.amount}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <FormControl
                                                fullWidth
                                                error={
                                                    formik.touched.typePeriodRent &&
                                                    Boolean(formik.errors.typePeriodRent)
                                                }
                                                className="form-control-type-offer"
                                                size="small"
                                            >
                                                <InputLabel
                                                    id="demo-simple-select-label"
                                                    className="type-offer-select"
                                                    color="secondary"
                                                >
                                                    {t<string>("add_offer.per_periode")}
                                                </InputLabel>
                                                <Select
                                                    id="typePeriodRent"
                                                    name="typePeriodRent"
                                                    color="secondary"
                                                    label={t<string>("add_offer.per_periode")}
                                                    labelId="demo-simple-select-label"
                                                    value={formik.values.typePeriodRent}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value={PeriodeRent.PerMonth}>
                                                        {t<string>("add_offer.per_month")}
                                                    </MenuItem>
                                                    <MenuItem value={PeriodeRent.PerDay}>
                                                        {t<string>("add_offer.per_day")}
                                                    </MenuItem>
                                                    <MenuItem value={PeriodeRent.PerYear}>
                                                        {t<string>("add_offer.per_year")}
                                                    </MenuItem>
                                                </Select>
                                                <FormHelperText id="component-helper-text">
                                                    {formik.touched.typePeriodRent && formik.errors.typePeriodRent}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <DatePicker
                                                label={t<string>("common.label_start_date")}
                                                value={formik.values.startDate}
                                                onChange={(newValue) => formik.setFieldValue("startDate", newValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} size="small" fullWidth error={false} color="secondary"/>
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <DatePicker
                                                label={t<string>("common.label_end_date")}
                                                value={formik.values.endDate}
                                                onChange={(newValue) => formik.setFieldValue("endDate", newValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} size="small" fullWidth error={false} color="secondary" />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{mt: 1}}>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="outlined"
                                                    color="neutral"
                                                    onClick={openModalSignature}
                                                    fullWidth>{t<string>("rentrequest.label_add_signature")}</Button>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{mt: 1}}>
                                        <Grid item xs={12}>
                                            <SignaturePad ref={padRef} canvasProps={{ className: "sigCanvas" }} />
                                        </Grid>
                                    </Grid>

                                </LocalizationProvider> : null
                        }

                        {
                            item.status === StatusRentRequest.STANDBY  && indexSelected === item.id ?
                                <ButtonGroup sx={{ my: 1 }} variant="contained" aria-label="outlined primary button group">
                                    <IconButton aria-label="delete" onClick={clear} color="error">
                                        <ClearIcon />
                                    </IconButton>
                                    <Button variant="outlined" color="neutral" onClick={(event) => cancelIndexAction(event)}>
                                        {t<string>("common.label_cancel")}
                                    </Button>
                                    <Button variant="outlined"
                                            color="success"
                                            type="submit">
                                        {t<string>("common.label_confirm")}
                                    </Button>
                                </ButtonGroup> : null
                        }
                    </form>

                </CardContent>
            </Card>
            {renderDialogCancelRentRequest()}
            {/*{renderDialogAddSignatureRentRequest()}*/}
        </Grid>
    )
}

function LoadingRentRequest() {
    return (
        <Grid item xs={12} md={6}>
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
        </Grid>
    );
}
