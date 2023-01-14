import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography/Typography';
import Container from '@mui/material/Container/Container';
import { useTranslation } from 'react-i18next';
import { ALL_APP_ROUTES } from '../../../core/config/all-app-routes';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert/Alert';
import {
  entitiesOrder,
  loadingEntitiesOrder,
  totalPagesOrder,
  activePageOrder,
  setActivePageOrder,
  loadingEntitiesOrderReceived,
  entitiesOrderReceived,
  totalPagesOrderReceived,
  activePageOrderReceived,
  setActivePageReceivedOrder,
  fetchReceivedOrder,
  resetReceivedOrder,
  resetPassedOrder,
  fetchPassedOrder,
} from '../store/slice';
import Card from '@mui/material/Card/Card';
import CardMedia from '@mui/material/CardMedia/CardMedia';
import {
  getBaseImageUrl,
  getFullnameUser,
  getFullUrlWithParams,
  getImageForOffer,
  getUserAvatar,
} from '../../../shared/utils/utils-functions';
import { AllAppConfig } from '../../../core/config/all-config';
import CardContent from '@mui/material/CardContent/CardContent';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ConvertReactTimeAgo } from '../../../shared/pages/react-time-ago';
import Accordion from '@mui/material/Accordion';
import Divider from '@mui/material/Divider';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { StatusOrder } from '../../../shared/enums/order.enum';
import InfiniteScroll from 'react-infinite-scroller';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
// import red from "@mui/material/colors/red";
import IconButton from '@mui/material/IconButton';
import { ICart } from '../../../shared/model/cart.model';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ListItem } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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

function LoadingOrders() {
  return (
    <Grid item xs={12} md={6}>
      {[0, 1, 2].map((key) => (
        <Card sx={{ display: { xs: 'block', sm: 'flex' }, my: 2 }} key={key}>
          <CardMedia
            sx={{
              width: { xs: '100%', sm: 250 },
              height: { xs: '100%', sm: 200 },
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
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
                  width={'100%'}
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

function ItemPassedOrder({ t, item }: { t: any; item: any }) {
  const navigate = useNavigate();

  const redirectToPorfile = (event: any, userId: number) => {
    event.stopPropagation();
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.PROFILE + '/' + userId);
    }, 300);
  };

  const rediretTo = (offerId?: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.DETAILS_OFFER + '/' + offerId);
    }, 300);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <CardContent sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                component="h4"
                variant="h4"
                sx={{ fontSize: '1.2rem' }}
              >
                <ConvertReactTimeAgo convertDate={item?.passedDate} />
              </Typography>

              <Typography component="h5" variant="h5" display="flex">
                {item.paymentMode}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="flex"
              >
                Nombres des produits: {item.numberOfProducts}
              </Typography>

              <Typography variant="subtitle2" display="flex">
                Total du commande = {item.totalCarts.toLocaleString('tn-TN')}{' '}
                TND
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                color="secondary"
                display="flex"
                sx={{ justifyContent: 'end' }}
              >
                {item.status === StatusOrder.PASSED
                  ? t('order.label_passed')
                  : item.status}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Accordion sx={{ mt: '0 !important' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="bg-brown"
        >
          <Typography>List des produits</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {item.carts.map((cart: ICart, index: number) => (
            <Box key={index}>
              <Box>
                <CardHeader
                  avatar={
                    <Avatar
                      role="img"
                      aria-label="Image avatar"
                      src={getUserAvatar(
                        cart?.sellOffer?.user?.id,
                        cart?.sellOffer?.user?.imageUrl,
                        cart?.sellOffer?.user?.sourceConnectedDevice
                      )}
                      alt="image not found"
                      onClick={(event: any) =>
                        redirectToPorfile(event, cart?.sellOffer?.user?.id)
                      }
                    >
                      {getFullnameUser(cart?.sellOffer?.user)?.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                  title={getFullnameUser(cart?.sellOffer?.user)}
                  subheader={
                    <React.Fragment>
                      <Typography>
                        <ConvertReactTimeAgo
                          convertDate={cart?.sellOffer?.dateCreated}
                        />
                      </Typography>
                    </React.Fragment>
                  }
                />

                <Box
                  sx={{ display: { xs: 'block', sm: 'flex' } }}
                  onClick={() => rediretTo(cart?.sellOffer?.id)}
                >
                  {cart?.sellOffer?.offerImages?.length ? (
                    <CardMedia
                      sx={{
                        width: { xs: '100%', sm: 250 },
                        height: { xs: '100%', sm: 200 },
                      }}
                    >
                      <LazyLoadImage
                        alt="Image offer"
                        src={getImageForOffer(
                          cart?.sellOffer?.id,
                          cart?.sellOffer?.offerImages[0].path
                        )}
                        placeholder={
                          <img
                            src={getBaseImageUrl(
                              AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                            )}
                            className="img-lazy-loading"
                            alt="image srfgroup"
                          />
                        }
                        placeholderSrc={getBaseImageUrl(
                          AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                        )}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = getBaseImageUrl(
                            AllAppConfig.DEFAULT_LAZY_IMAGE
                          );
                        }}
                        className="img-lazy-loading"
                      />
                    </CardMedia>
                  ) : null}
                  <CardContent>
                    <Typography variant="h6">
                      {cart?.sellOffer?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Montant {cart?.sellOffer?.amount?.toLocaleString('tn-TN')}{' '}
                      TND
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantité {cart?.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Frais de livraison {cart?.sellOffer?.shippingCost} TND
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Total {cart?.total} TND
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

function ItemReceivedOrder({ item }: { item: any }) {
  const navigate = useNavigate();

  const redirectToPorfile = (event: any, userId: number) => {
    event.stopPropagation();
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.PROFILE + '/' + userId);
    }, 300);
  };

  const rediretTo = (offerId?: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.DETAILS_OFFER + '/' + offerId);
    }, 300);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              role="img"
              aria-label="Image avatar"
              src={getUserAvatar(
                item?.user?.id,
                item?.user?.imageUrl,
                item?.user?.sourceConnectedDevice
              )}
              alt="image not found"
              onClick={(event: any) => redirectToPorfile(event, item?.user?.id)}
            >
              {getFullnameUser(item?.user)?.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <ExpandMoreIcon />
            </IconButton>
          }
          title={getFullnameUser(item?.user)}
          subheader={item?.user?.email}
        />

        <CardContent className="card-content">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                component="h4"
                variant="h4"
                sx={{ fontSize: '1.2rem' }}
              >
                <ConvertReactTimeAgo convertDate={item?.passedDate} />
              </Typography>

              <Typography component="h5" variant="h5" display="flex">
                {item.paymentMode}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                color="secondary"
                display="flex"
                sx={{ justifyContent: 'end' }}
              >
                {item.status === StatusOrder.PASSED ? item.status : item.status}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Accordion sx={{ mt: '0 !important' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="bg-brown"
        >
          <Typography>List des produits</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {item.carts.map((cart: ICart, index: number) => (
            <Box key={index}>
              <Box>
                <CardHeader
                  avatar={
                    <Avatar
                      role="img"
                      aria-label="Image avatar"
                      src={getUserAvatar(
                        cart?.sellOffer?.user?.id,
                        cart?.sellOffer?.user?.imageUrl,
                        cart?.sellOffer?.user?.sourceConnectedDevice
                      )}
                      alt="image not found"
                      onClick={(event: any) =>
                        redirectToPorfile(event, cart?.sellOffer?.user?.id)
                      }
                    >
                      {getFullnameUser(cart?.sellOffer?.user)?.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                  title={cart?.sellOffer?.title}
                  subheader={
                    <React.Fragment>
                      <Typography>
                        <ConvertReactTimeAgo
                          convertDate={cart?.sellOffer?.dateCreated}
                        />
                      </Typography>
                    </React.Fragment>
                  }
                />

                <Box
                  sx={{ display: { xs: 'block', sm: 'flex' } }}
                  onClick={() => rediretTo(cart?.sellOffer?.id)}
                >
                  {cart?.sellOffer?.offerImages?.length ? (
                    <CardMedia
                      sx={{
                        width: { xs: '100%', sm: 250 },
                        height: { xs: '100%', sm: 200 },
                      }}
                    >
                      <LazyLoadImage
                        alt="Image offer"
                        src={getImageForOffer(
                          cart?.sellOffer?.id,
                          cart?.sellOffer?.offerImages[0].path
                        )}
                        placeholder={
                          <img
                            src={getBaseImageUrl(
                              AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                            )}
                            className="img-lazy-loading"
                            alt="image srfgroup"
                          />
                        }
                        placeholderSrc={getBaseImageUrl(
                          AllAppConfig.DEFAULT_LAZY_IMAGE_LOADING
                        )}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = getBaseImageUrl(
                            AllAppConfig.DEFAULT_LAZY_IMAGE
                          );
                        }}
                        className="img-lazy-loading"
                      />
                    </CardMedia>
                  ) : null}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Montant {cart?.sellOffer?.amount?.toLocaleString('tn-TN')}{' '}
                      TND
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantité {cart?.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Frais de livraison {cart?.sellOffer?.shippingCost} TND
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Total {cart?.total} TND
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

export default function ListOrders() {
  const [value, setValue] = React.useState(0);
  const [isFirstTimePassed, setIsFirstTimePassed] = React.useState(true);
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
              {t<string>('order.title_order')}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Commande reçu" {...a11yProps(0)} />
            <Tab label="Commande passée" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ListReceivedORders />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListPassedORders />
        </TabPanel>
      </Box>
    </Container>
  );
}

function ListReceivedORders() {
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const loadingEntitiesOrderReceivedSelector =
    useSelector(loadingEntitiesOrderReceived) ?? false;
  const entitiesOrderReceivedSelector =
    useSelector(entitiesOrderReceived) ?? [];
  const totalPagesOrderReceivedSelector =
    useSelector(totalPagesOrderReceived) ?? 0;
  const activePageOrderReceivedSelector =
    useSelector(activePageOrderReceived) ?? -1;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(resetReceivedOrder({}));
    dispatch(setActivePageReceivedOrder(0));
  };

  React.useEffect(() => {
    if (isFirstTime && entitiesOrderReceivedSelector.length === 0) {
      setIsFirstTime(false);
      resetAll();
    }
  }, [isFirstTime]);

  React.useEffect(() => {
    if (activePageOrderReceivedSelector >= 0 && !isFirstTime) {
      dispatch(
        fetchReceivedOrder({
          page: activePageOrderReceivedSelector,
          size: AllAppConfig.ORDERS_PER_PAGE,
          queryParams: '',
        })
      );
    }
  }, [activePageOrderReceivedSelector, isFirstTime]);

  const loadMore = () => {
    setIsFirstTime(false);
    dispatch(setActivePageReceivedOrder(activePageOrderReceivedSelector + 1));
  };

  return (
    <InfiniteScroll
      pageStart={activePageOrderReceivedSelector}
      loadMore={loadMore}
      hasMore={
        totalPagesOrderReceivedSelector - 1 > activePageOrderReceivedSelector
      }
      loader={<div className="loader" key={0}></div>}
      threshold={0}
      initialLoad={false}
    >
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {entitiesOrderReceivedSelector?.map((item: any, index: number) => (
          <ItemReceivedOrder item={item} key={index} />
        ))}

        {loadingEntitiesOrderReceivedSelector ? <LoadingOrders /> : null}

        {!loadingEntitiesOrderReceivedSelector &&
        entitiesOrderReceivedSelector?.length == 0 ? (
          <Grid item xs={12}>
            <Alert severity="warning">
              {t<string>('order.no_commandes_founds')}
            </Alert>
          </Grid>
        ) : null}
      </Grid>
    </InfiniteScroll>
  );
}

function ListPassedORders() {
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const loadingEntitiesOrderSelector =
    useSelector(loadingEntitiesOrder) ?? false;
  const entitiesOrderSelector = useSelector(entitiesOrder) ?? [];
  const totalPagesOrderSelector = useSelector(totalPagesOrder) ?? 0;
  const activePageOrderSelector = useSelector(activePageOrder) ?? -1;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(resetPassedOrder({}));
    dispatch(setActivePageOrder(0));
  };

  React.useEffect(() => {
    if (isFirstTime && entitiesOrderSelector.length === 0) {
      setIsFirstTime(false);
      resetAll();
    }
  }, [isFirstTime]);

  React.useEffect(() => {
    if (activePageOrderSelector >= 0 && !isFirstTime) {
      dispatch(
        fetchPassedOrder({
          page: activePageOrderSelector,
          size: AllAppConfig.ORDERS_PER_PAGE,
          queryParams: '',
        })
      );
    }
  }, [activePageOrderSelector, isFirstTime]);

  const loadMore = () => {
    setIsFirstTime(false);
    dispatch(setActivePageOrder(activePageOrderSelector + 1));
  };

  return (
    <InfiniteScroll
      pageStart={activePageOrderSelector}
      loadMore={loadMore}
      hasMore={totalPagesOrderSelector - 1 > activePageOrderSelector}
      loader={<div className="loader" key={0}></div>}
      threshold={0}
      initialLoad={false}
    >
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {entitiesOrderSelector?.map((item: any, index: number) => (
          <ItemPassedOrder t={t} item={item} key={index} />
        ))}

        {loadingEntitiesOrderSelector ? <LoadingOrders /> : null}

        {!loadingEntitiesOrderSelector && entitiesOrderSelector?.length == 0 ? (
          <Grid item xs={12}>
            <Alert severity="warning">
              {t<string>('order.no_commandes_founds')}
            </Alert>
          </Grid>
        ) : null}
      </Grid>
    </InfiniteScroll>
  );
}
