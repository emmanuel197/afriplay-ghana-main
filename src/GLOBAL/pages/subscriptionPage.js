import React from "react";
import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionsData from "../../utils/formatSubscriptionData";
import SubscriptionCard from "../components/cards/subscriptionCard";
import { fetchPackageMoviesReducer } from "../redux/slice/moviesSlice";
import "../components/styles/SubscriptionCard.scss";
import { arrowImg } from "../../utils/assets";
import SubscriptionModal from "../components/SubscriptionModal";
import Spinner from "../components/Spinner";
import "../components/styles/buttons.scss";
// Subscriptions component
const SubscriptionPage = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const { packageMovies } = useSelector((state) => state.fetchMovies);
  const { isLoading, modalOpen } = useSelector((state) => state.fetchPackages);
  const subscriptionsContainerRef = useRef(null);

  // Call fetchPackageMovies when the component mounts
  useEffect(() => {
    // console.warn("location changed!");
    dispatch(fetchPackageMoviesReducer(SubscriptionsData));
  }, [dispatch]);

  // const subscriptionHistoryRedirect = () => {
  //   window.location.href = "/subscription-history";
  // }

  const subscriptions = Array.isArray(packageMovies) ? packageMovies : [];
  return (
    <>
      <Header links={5} signup={1} />
      <main style={{ background: " #1a052b" }}>
        <div className="subscriptions">
          {isLoading && <Spinner />}
          {modalOpen && <SubscriptionModal />}
          {!modalOpen && (
            <>
              <h2 className="subscriptions-header">Choose your plan </h2>

              <div
                className="subscriptions-container"
                ref={subscriptionsContainerRef}
              >
                {subscriptions.map((subscription, index) => (
                  <SubscriptionCard key={index} subscription={subscription} />
                ))}
                <p className="terms-of-use">Afriplay Terms of Use apply for all bundles</p>
              </div>  
            </>
          )}
        </div>
      </main>

      {!modalOpen && <Footer />}
    </>
  );
};

export default SubscriptionPage;
