import * as React from 'react';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar/ListItemAvatar';
import Avatar from '@mui/material/Avatar/Avatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import { getBaseImageUrl } from '../../../shared/utils/utils-functions';
import { List } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FunctionComponent } from 'react';

interface IService {
  img: string;
  primaryTitle: string;
  secondTitle: string;
}

const SecondHorizentalListHomeClient: FunctionComponent = () => {
  const { t } = useTranslation();

  const listServices: IService[] = [
    {
      img: getBaseImageUrl('/assets/images/home/services/delivery.png'),
      primaryTitle: t('home.label_primary_express_delivery'),
      secondTitle: t('home.label_secondary_express_delivery'),
    },
    {
      img: getBaseImageUrl('/assets/images/home/services/euro.png'),
      primaryTitle: t('home.label_primary_satisfied_refunded'),
      secondTitle: t('home.label_second_satisfied_refunded'),
    },
    {
      img: getBaseImageUrl('/assets/images/home/services/money.png'),
      primaryTitle: t('home.label_primary_cash_delivery'),
      secondTitle: t('home.label_second_cash_delivery'),
    },
    {
      img: getBaseImageUrl('/assets/images/home/services/chat.png'),
      primaryTitle: t('home.label_primary_service_client'),
      secondTitle: t('home.label_second_service_client'),
    },
  ];

  return (
    <Box sx={{ p: 8, my: 10 }} className="bg-brown">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listServices.map((service: IService, index: number) => (
          <Grid item xs={12} md={3} key={`service-${index}`}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent
                sx={{ flexGrow: 1, minHeight: '150px' }}
                className="bg-yellow"
              >
                <List aria-label="contacts">
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={service.primaryTitle} src={service.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={service.primaryTitle}
                      secondary={service.secondTitle}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default React.memo(SecondHorizentalListHomeClient);
