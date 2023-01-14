import { useTranslation } from 'react-i18next';
import { List, Paper } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { entityCart } from '../../store/slice';
import Box from '@mui/material/Box';
import { getBaseImageUrl } from '../../../../shared/utils/utils-functions';

export default function DetailsCart({
  activeStep,
  submitHandler,
}: {
  activeStep: number;
  submitHandler: any;
}) {
  const { t } = useTranslation();

  const entityCartSelector = useSelector(entityCart) ?? {};

  return (
    <Box>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Details Panier</ListSubheader>}
      >
        {entityCartSelector?.detailsCartGlobal?.map(
          (cartDetails: any, index: null) => (
            <ListItem key={index}>
              <ListItemText
                id="switch-list-label-wifi"
                primary={`${cartDetails?.numberOfProducts} produits`}
              />
              <Typography variant="subtitle2" color="text.secondary">
                {cartDetails?.totalCarts?.toLocaleString('tn-TN')} TND
              </Typography>
            </ListItem>
          )
        )}

        {/*{*/}
        {/*  entityCartSelector.detailsCartGlobal.map((cartDetails: any, index: null) => {*/}
        {/*    <Box key={index}>*/}
        {/*      <ListItem>*/}
        {/*        <ListItemText*/}
        {/*            id="switch-list-label-wifi"*/}
        {/*            primary="Frais de livraison"*/}
        {/*        />*/}
        {/*        <Typography variant="subtitle2" color="text.secondary">*/}
        {/*          {cartDetails.numberOfProducts} TND*/}
        {/*        </Typography>*/}
        {/*      </ListItem>*/}
        {/*      <Divider />*/}
        {/*    </Box>*/}
        {/*  })*/}
        {/*}*/}

        <ListItem>
          <ListItemText id="switch-list-label-wifi" primary="Total TTC" />
          <Typography variant="subtitle2" color="text.secondary">
            {entityCartSelector?.totalGlobalCarts?.toLocaleString('tn-TN')} TND
          </Typography>
        </ListItem>
      </List>

      <Paper elevation={0} sx={{ mt: 2 }}>
        <img
          src={getBaseImageUrl('/assets/images/logo-svg.svg')}
          className="full-img-responsive"
          alt="Logo SrfGroup"
          loading="lazy"
        />
      </Paper>
    </Box>
  );
}
