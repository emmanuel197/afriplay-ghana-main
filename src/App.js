import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./GLOBAL/pages/landing";
import SignUpPage from "./GLOBAL/pages/signUpPage";
import OTPVerification from "./GLOBAL/pages/otpVerification";
import MovieDetailsPage from "./GLOBAL/pages/movieDetailsPage";
import Home from "./GLOBAL/pages/home";
import ProtectedRoute from "./GLOBAL/components/ProtectedRoute";
import AfriPremiere from "./GLOBAL/pages/afripremiere";
import Movies from "./GLOBAL/pages/movies";
import ErrorPage from "./GLOBAL/pages/errorPage";
import Profile from "./GLOBAL/pages/profile";
import SeriesDetails from "./GLOBAL/pages/seriesDetails";
import Series from "./GLOBAL/pages/series";
import Watch from "./GLOBAL/pages/watch";
import AfriplayLive from "./GLOBAL/pages/afriplaylive";
import LiveTV from "./GLOBAL/pages/livetv";
import PayPerView from "./GLOBAL/pages/payperview";
import Search from "./GLOBAL/pages/search";
import SelectNetwork from "./GLOBAL/pages/auth/selectNetwork";
import "./_global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/select-network" element={<SelectNetwork />} /> */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/series/:id" element={<ProtectedRoute><SeriesDetails /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} />
        <Route path="/afripremiere" element={<ProtectedRoute><AfriPremiere /></ProtectedRoute>} />
        <Route path="/afriplaylive" element={<ProtectedRoute><AfriplayLive /></ProtectedRoute>} />
        <Route path="/livetv" element={<ProtectedRoute><LiveTV /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/pay-per-view/:id/:genre" element={<ProtectedRoute><PayPerView /></ProtectedRoute>} />
        <Route path="/out-of-region" element={<ErrorPage text='Service is only available in Ghana and Nigeria' />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/watch/:type/:id" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage text='Page not found!' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
