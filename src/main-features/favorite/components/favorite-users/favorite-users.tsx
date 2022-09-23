import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import Typography from "@mui/material/Typography/Typography";
import { IFavoriteUser } from "../../../../shared/model/favorite.model";
import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Alert from "@mui/material/Alert/Alert";
import { useTranslation } from "react-i18next";
import ListFavoriteUsers from "./ui-segments/ListFavoriteUsers";
import {
  deleteFavoriteUsers,
  deleteSuccessFavoriteUser,
  entitiesFavoriteUser,
  fetchFavoriteUsers,
  loadingEntitiesFavoriteUser,
  resetFavoriteUsers,
  totalItemsFavoriteUser,
  totalPagesFavoriteUser,
} from "../../store/slice";

export default function FavoriteUsers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loadingEntitiesFavoriteUserSelector =
    useSelector(loadingEntitiesFavoriteUser) ?? false;
  const entitiesFavoriteUserSelector = useSelector(entitiesFavoriteUser) ?? [];
  const totalItemsFavoriteUserSelector =
    useSelector(totalItemsFavoriteUser) ?? -1;
  const totalPagesFavoriteUserSelector =
    useSelector(totalPagesFavoriteUser) ?? 0;
  const deleteSuccessFavoriteUserSelector =
    useSelector(deleteSuccessFavoriteUser) ?? false;

  React.useEffect(() => {
    dispatch(
      fetchFavoriteUsers({
        page: 0,
        size: 20,
        queryParams: "",
      })
    );
  }, []);

  React.useEffect(() => {
    if (deleteSuccessFavoriteUserSelector) {
      dispatch(resetFavoriteUsers({}));

      dispatch(
        fetchFavoriteUsers({
          page: 1,
          size: 20,
          queryParams: "",
        })
      );
    }
  }, [deleteSuccessFavoriteUserSelector]);

  const deleteFavoriteUser = (id: number | undefined) => {
    dispatch(
      deleteFavoriteUsers({
        id: id,
      })
    );
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
            <Typography color="text.primary">Favorites users</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {loadingEntitiesFavoriteUserSelector ? (
          <Grid item xs={12}>
            <Box sx={{ paddingTop: 10, textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        ) : null}

        {entitiesFavoriteUserSelector && entitiesFavoriteUserSelector.length > 0
          ? entitiesFavoriteUserSelector.map(
              (favorite: IFavoriteUser, index: number) => (
                <ListFavoriteUsers
                  key={favorite.id}
                  favorite={favorite}
                  parentCallback={deleteFavoriteUser}
                />
              )
            )
          : !loadingEntitiesFavoriteUserSelector && (
              <Grid item xs={12}>
                <Alert severity="warning">
                  {t<string>("favorite.user.message_no_favorite_found")}
                </Alert>
              </Grid>
            )}
      </Grid>
    </Container>
  );
}
