import React from "react";
import "../components/styles/SubscriptionModal.scss";
import { subscriptionModalReducer, activeSubscriptionReducer } from "../redux/slice/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { purchasePackage, cancelSubscription, fetchPurchaseHistory } from "../redux/subscriptionApis";

function SubscriptionModal() {
  const dispatch = useDispatch();
  const closeModal = async () => {
    
    dispatch(subscriptionModalReducer({ isOpen: false }));
  };
  const { productId, paymentInitiated, activeSubscription } = useSelector(
    (state) => state.fetchPackages
  );
  
  const subscriber_uid = window.localStorage.getItem("afri_username");
  const title = paymentInitiated
    ? `Your subscription has been initiated.....`
    : `Are You Sure You Want to ${
        activeSubscription ? "Cancel Your Subscription" : "Continue"
      }?`;

  const _initPurchasePackage = () => {
    activeSubscription
      ? cancelSubscription(productId)
      : purchasePackage(productId, subscriber_uid);
  };

  const _homeRedirect = () => {
    window.location.href = "/home";
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          {!paymentInitiated && <button onClick={closeModal}>&#10006;</button>}
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>

        <div className="footer">
          {!paymentInitiated && (
            <button
              onClick={() => {
                closeModal();
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          )}
          <button
            onClick={paymentInitiated ? _homeRedirect : _initPurchasePackage}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;
