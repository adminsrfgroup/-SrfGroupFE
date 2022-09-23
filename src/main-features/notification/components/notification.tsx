import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import LoadingNotification from "./ui-segments/NotificationLoading";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import "./notification.scss";
import { AllAppConfig } from "../../../core/config/all-config";
import { ModuleNotification } from "../../../shared/enums/module-notification";
import { INotification } from "../../../shared/model/notification.model";
import { ConvertReactTimeAgo } from "../../../shared/pages/react-time-ago";
import { useDispatch, useSelector } from "react-redux";
import {
  addIsReadSuccessMyNotifications,
  addReadNotifications,
  entitiesMyNotifications,
  fetchMyNotifications,
  loadingEntitiesMyNotifications,
  resetMyNotifications,
  totalPagesMyNotifications,
} from "../store/slice";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { resetNumberOfNotificationsNotSee } from "../../user/store/slice";

export default function Notification() {
  const [activePage, setActivePage] = React.useState(-1);

  const tmpListNotSee: INotification[] = [];
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingEntitiesMyNotificationsSelector =
    useSelector(loadingEntitiesMyNotifications) ?? false;
  const entitiesMyNotificationsSelector =
    useSelector(entitiesMyNotifications) ?? [];
  // const totalItemsMyNotificationsSelector = useSelector(totalItemsMyNotifications) ?? -1;
  const totalPagesMyNotificationsSelector =
    useSelector(totalPagesMyNotifications) ?? 0;
  const addIsReadSuccessMyNotificationsSelector =
    useSelector(addIsReadSuccessMyNotifications) ?? false;

  const resetAll = () => {
    dispatch(resetMyNotifications({}));
    setActivePage(0);
  };

  React.useEffect(() => {
    resetAll();
  }, []);

  React.useEffect(() => {
    if (activePage >= 0) {
      dispatch(
        fetchMyNotifications({
          page: activePage,
          size: AllAppConfig.OFFERS_PER_PAGE,
          queryParams: "",
        })
      );
    }
  }, [activePage]);

  React.useEffect(() => {
    if (
      entitiesMyNotificationsSelector &&
      entitiesMyNotificationsSelector.length > 0
    ) {
      for (let i = 0; i < entitiesMyNotificationsSelector.length; i++) {
        if (!entitiesMyNotificationsSelector[i].isRead) {
          tmpListNotSee.push({
            id: entitiesMyNotificationsSelector[i].id,
          });
        }
      }
      if (tmpListNotSee.length > 0) {
        dispatch(addReadNotifications(tmpListNotSee));
        // props.setIsReadNotifications(tmpListNotSee);
      }
    }
  }, [entitiesMyNotificationsSelector]);

  React.useEffect(() => {
    if (addIsReadSuccessMyNotificationsSelector) {
      dispatch(resetNumberOfNotificationsNotSee({}));
      // props.resetNbeNotificationsNotRead();
    }
  }, [addIsReadSuccessMyNotificationsSelector]);

  const loadMore = () => {
    setActivePage(activePage + 1);
  };

  const redirect = (notification: INotification) => {
    if (notification.module === ModuleNotification.COMMENT_OFFER_NOTIFICATION) {
      setTimeout(() => {
        navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + notification?.offer?.id);
      }, 300);
    }
  };

  return (
    <Container>
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
            <Typography color="text.primary">
              {t<string>("notification.title_page")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        style={{
          paddingTop: 50,
        }}
      >
        <Grid item xs={12} sm={6} md={3}></Grid>

        <Grid item xs={12} sm={6} md={6} className="my-container">
          <InfiniteScroll
            pageStart={activePage}
            loadMore={loadMore}
            hasMore={
              totalPagesMyNotificationsSelector - 1 > activePage &&
              !loadingEntitiesMyNotificationsSelector
            }
            loader={<div className="loader" key={0}></div>}
            threshold={0}
            initialLoad={false}
          >
            <List>
              {entitiesMyNotificationsSelector.map(
                (notification: INotification, index: number) => (
                  <React.Fragment
                    key={`notification-${notification.id}-${index}`}
                  >
                    <ListItem
                      button
                      sx={{
                        bgcolor: notification.isRead ? "" : "background.paper",
                      }}
                      onClick={() => redirect(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <CircleNotificationsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <ConvertReactTimeAgo
                            convertDate={notification.dateCreated}
                          />
                        }
                        secondary={notification.content}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                )
              )}

              {loadingEntitiesMyNotificationsSelector ? (
                <LoadingNotification />
              ) : null}
            </List>
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Container>
  );
}
