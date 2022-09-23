import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider/Divider";
import Skeleton from "@mui/material/Skeleton/Skeleton";

export default function LoadingNotification() {
  return (
    <List
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <ListItem button>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" height={40} />}
          secondary={<Skeleton variant="text" height={20} />}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem button>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" height={40} />}
          secondary={<Skeleton variant="text" height={20} />}
        />
      </ListItem>
    </List>
  );
}
