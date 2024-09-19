import { useEffect, useState } from "react";
import AfriPremiereBanner from "../components/banners/AfriPremiereBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reel from "../components/reels/Reel";

const AfriPremiere = () => {


  return (
    <>
      <Header links={5} />
     
      <AfriPremiereBanner />
      <br />
      <br />
      {/* <Reel title='MOST WATCHED' /> */}
      {/* <Reel title='RECENTLY ADDED' /> */}
      {/* <Reel title='COMING SOON' /> */}
      <Footer />
    </>
  );
};

export default AfriPremiere;
