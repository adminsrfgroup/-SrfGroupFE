import React from "react";
import Box from "@mui/material/Box/Box";
import List from "@mui/material/List/List";
import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import {useTranslation} from "react-i18next";
import ProblemeDeclaration from "../../../../probleme-declaration/components/probleme-declaration";
import {useDispatch, useSelector} from "react-redux";
import {entitiesMostRequested, fetchMostRequestedOffers} from "../../../store/slice";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {getBaseImageUrl, getImageForOffer} from "../../../../../shared/utils/utils-functions";
import {AllAppConfig} from "../../../../../core/config/all-config";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ConvertReactTimeAgo} from "../../../../../shared/pages/react-time-ago";
import {ALL_APP_ROUTES} from "../../../../../core/config/all-app-routes";
import {useNavigate} from "react-router-dom";
import PubPerMonth from "./PubPerMonth";

export default function RightSearch() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const entitiesMostRequestedSelector = useSelector(entitiesMostRequested) ?? [];

    React.useEffect(() => {
        if (entitiesMostRequestedSelector?.length === 0) {
            dispatch(fetchMostRequestedOffers({}))
        }
    }, [])

    const rediretTo = (offerId?: number) => {
        setTimeout(() => {
            navigate(ALL_APP_ROUTES.DETAILS_OFFER + "/" + offerId);
        }, 300);
    };

    return (
        <Box>
            <List
                sx={{width: "100%", mb: 4}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" className="bg-yellow">
                        {t<string>('search.label_most_requested')}
                    </ListSubheader>
                }
            >
                {entitiesMostRequestedSelector.map((offer: any, index: number) => (
                    <Box key={index} sx={{mt: 3}}>
                        <CardActionArea onClick={() => rediretTo(offer.id)}>
                            <Card sx={{display: 'flex'}}>
                                <CardMedia
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: "#0000004f",
                                    }}
                                >
                                    {offer?.offerImages?.length ? (
                                        <LazyLoadImage
                                            alt="Image offer"
                                            src={getImageForOffer(offer.id, offer.offerImages[0].path)}
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
                                        <Box sx={{display: {xs: "none", md: "block"}, height: "100%"}}>
                                            <img
                                                src={getBaseImageUrl(AllAppConfig.DEFAULT_LAZY_IMAGE)}
                                                className="img-lazy-loading"
                                                alt="image not found"
                                            />
                                        </Box>
                                    )}
                                </CardMedia>
                                <CardContent sx={{flex: 1, pt: 0}}>
                                    <Typography variant="subtitle1">
                                        {offer.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <ConvertReactTimeAgo convertDate={offer.dateCreated}/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Box>
                ))}
            </List>

            <Card sx={{my: 3}}>
                <CardContent>
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/668nUCeBHyY"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </CardContent>
            </Card>

            <PubPerMonth />

            <ProblemeDeclaration/>
        </Box>
    );
}
