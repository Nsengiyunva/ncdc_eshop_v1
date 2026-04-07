import React from "react";
import { MainLayout } from "components/Layout/MainLayout";

import GiftBanner from "../components/GiftBanner";
import { DailyDeals } from "../components/DailyDeals";
import GreatDeals from "../components/GreatDeals";
import TrendingItems from "../components/TrendingItems";
import Carousel from "../components/Carousel";

export const Home = () => {
  return (
    <>
      <div className="">
        <MainLayout page="home" title="Shop">
          <div className="w-full space-y-3 mt-6">
            <div className="">
              <Carousel />
            </div>
            <div>
              <GiftBanner />
            </div>
            <div className="">
              <DailyDeals />
            </div>
            <div>
              <GreatDeals />
            </div>
            <div className="">
              <TrendingItems />
            </div>
            <div></div>
          </div>
        </MainLayout>
      </div>
    </>
  );
};
