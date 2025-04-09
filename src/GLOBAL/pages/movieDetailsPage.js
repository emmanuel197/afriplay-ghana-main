import React from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect } from "react";
import MovieDetailsBanner from "../components/banners/MovieDetailsBanner";

const MovieDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header links={5} signup={1} />
      <MovieDetailsBanner />
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
