import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import {Link} from "react-router-dom";
import {ALL_APP_ROUTES} from "../../../../core/config/all-app-routes";
import Typography from "@mui/material/Typography/Typography";
import {IFavoriteUser} from "../../../../shared/model/favorite.model";
import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Alert from "@mui/material/Alert/Alert";
import {useTranslation} from "react-i18next";
import ListFavoriteUsers from "./ui-segments/ListFavoriteUsers";
import {
    activePageFavoriteUser,
    deleteFavoriteUsers,
    deleteSuccessFavoriteUser,
    entitiesFavoriteUser,
    fetchFavoriteUsers,
    loadingEntitiesFavoriteUser,
    resetFavoriteUsers,
    setActivePageFavoriteUsers,
    totalPagesFavoriteUser,
} from "../../store/slice";
import {AllAppConfig} from "../../../../core/config/all-config";
import InfiniteScroll from "react-infinite-scroller";
import {setActivePageNotifications} from "../../../notification/store/slice";

export default function FavoriteUsers() {

    const [isFirstTime, setIsFirstTime] = React.useState(true);

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const loadingEntitiesFavoriteUserSelector =
        useSelector(loadingEntitiesFavoriteUser) ?? false;
    const entitiesFavoriteUserSelector = useSelector(entitiesFavoriteUser) ?? [];
    const totalPagesFavoriteUserSelector =
        useSelector(totalPagesFavoriteUser) ?? 0;
    const activePageFavoriteUserSelector =
        useSelector(activePageFavoriteUser) ?? -1;
    const deleteSuccessFavoriteUserSelector =
        useSelector(deleteSuccessFavoriteUser) ?? false;


    const resetAll = () => {
        dispatch(resetFavoriteUsers({}));
        dispatch(setActivePageFavoriteUsers(0));
    };

    React.useEffect(() => {
        if (isFirstTime && entitiesFavoriteUserSelector.length === 0) {
            setIsFirstTime(false);
            resetAll();
        }
    }, [isFirstTime]);

    React.useEffect(() => {
        if (activePageFavoriteUserSelector >= 0 && !isFirstTime) {
            dispatch(
                fetchFavoriteUsers({
                    page: activePageFavoriteUserSelector,
                    size: AllAppConfig.FAVORITE_USERS_PER_PAGE,
                    queryParams: "",
                })
            );
        }
    }, [activePageFavoriteUserSelector, isFirstTime]);

    React.useEffect(() => {
        if (deleteSuccessFavoriteUserSelector) {
            dispatch(setActivePageFavoriteUsers(0));
            resetAll();
            dispatch(
                fetchFavoriteUsers({
                    page: 0,
                    size: AllAppConfig.FAVORITE_USERS_PER_PAGE,
                    queryParams: '',
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

    const loadMore = () => {
        setIsFirstTime(false);
        dispatch(setActivePageFavoriteUsers(activePageFavoriteUserSelector + 1));
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

            <InfiniteScroll
                pageStart={activePageFavoriteUserSelector}
                loadMore={loadMore}
                hasMore={
                    totalPagesFavoriteUserSelector - 1 > activePageFavoriteUserSelector
                }
                loader={<div className="loader" key={0}></div>}
                threshold={0}
                initialLoad={false}
            >
                <Grid container spacing={4} sx={{mt: 3}}>

                    {
                        entitiesFavoriteUserSelector.map(
                            (favorite: IFavoriteUser, index: number) => (
                                <ListFavoriteUsers
                                    key={favorite.id}
                                    favorite={favorite}
                                    parentCallback={deleteFavoriteUser}
                                />
                            )
                        )
                    }

                    {loadingEntitiesFavoriteUserSelector ? (
                        <Grid item xs={12}>
                            <Alert severity="warning">
                                {t<string>("favorite.user.message_no_favorite_found")}
                            </Alert>
                        </Grid>
                    ) : null}

                </Grid>
            </InfiniteScroll>


        </Container>
    );
}
