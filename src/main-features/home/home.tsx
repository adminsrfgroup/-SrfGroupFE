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
import './home.scss';

export default function Home() {
  return (
    <Box>

        <TopHomeSlides />

        <section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="#9c27b0" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,213.3C384,235,480,245,576,208C672,171,768,85,864,64C960,43,1056,85,1152,101.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        </section>

        <ForSellHomeClient />

        <FirstHorizentalListHomeClient />

        <ForRentHomeClient />

        <SecondHorizentalListHomeClient />

        <ForFindHomeClient />

        <ThirdHorizentalListHomeClient />

        <RecentlyAddedHomeClient />

        <PostHomeFeature />


        {/*<BottomHomeSlides />*/}
    </Box>
  );
}
