import React from "react";
import "../components/styles/confirmationModal.scss";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>&#10006;</button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        {message && <p>{message}</p>}
        <div className="footer">
          <button onClick={onCancel} className="cancelBtn">
            Cancel
          </button>
          <button onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
