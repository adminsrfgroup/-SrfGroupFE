import * as React from "react";
import Box from "@mui/material/Box/Box";
import TopHomeSlides from "./ui-segments/TopHomeSlides";
import ForSellHomeClient from "./ui-segments/ForSellHomeClient";
import ForRentHomeClient from "./ui-segments/ForRentHomeClient";
import SecondHorizentalListHomeClient from "./ui-segments/SecondHorizentalListHomeClient";
import ForFindHomeClient from "./ui-segments/ForFindHomeClient";
import ThirdHorizentalListHomeClient from "./ui-segments/ThirdHorizentalListHomeClient";
import FirstHorizentalListHomeClient from "./ui-segments/FirstHorizentalListHomeClient";
import RecentlyAddedHomeClient from "./ui-segments/RecentlyAddedHomeClient";
import PostHomeFeature from "./ui-segments/PostHomeFeature";
import BottomHomeSlides from "./ui-segments/BottomHomeSlides";
import './home.scss';

export default function Home() {
  return (
    <Box>
        {/*<TopHomeSlides />*/}

        <FirstHorizentalListHomeClient />

        {/*<ForRentHomeClient />*/}

        {/*<SecondHorizentalListHomeClient />*/}

        {/*<ForFindHomeClient />*/}

        {/*<ThirdHorizentalListHomeClient />*/}

        {/*<RecentlyAddedHomeClient />*/}

        {/*<PostHomeFeature />*/}

        {/*<BottomHomeSlides />*/}
    </Box>
  );
}
