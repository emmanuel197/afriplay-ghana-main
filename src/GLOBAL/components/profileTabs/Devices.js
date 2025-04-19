import React, { useEffect, useState } from "react";
import { fetchUserDevices, deleteUserDevice } from "../../redux/account";
import "../../components/styles/Devices.scss";
import ConfirmationModal from "../../components/confirmationModal";

const Devices = ({ active }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchUserDevices();
        // Depending on your API, adjust how you extract the devices data.
        setDevices(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (active !== "devices") return null;
  if (loading) return <div>Loading devices...</div>;
  if (error) return <div>Error: {error}</div>;

  // Called when a user clicks the delete icon on a device
  const handleDeleteClick = (device) => {
    setDeviceToDelete(device);
    setIsDeleteModalOpen(true);
  };

  // Cancel handler for the confirmation modal: simply close the modal.
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeviceToDelete(null);
  };

  // Confirm handler for the confirmation modal:
  // Calls the delete action, then updates local state and closes the modal.
  const handleConfirmDelete = async () => {
    if (!deviceToDelete) return;
    try {
      await deleteUserDevice(deviceToDelete.id);
      // Update the devices list by filtering out the deleted device.
      setDevices(devices.filter(device => device.id !== deviceToDelete.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleteModalOpen(false);
      setDeviceToDelete(null);
    }
  };

  return (
    <div className="devices-tab">
      <h3 className="devices-tab-header">My Devices</h3>
      {devices.length === 0 ? (
        <p className="no-devices-found">No devices found.</p>
      ) : (
        <ul className="devices-list">
          {devices.map((device, index) => (
            <li className="device-wrapper" key={index}>
              {device.device_class === "DESKTOP" ? (
                <svg
                  className="device-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2M7 16.999V5h10l.002 11.999z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="device-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-1.63 2.45c-.44.66.03 1.55.83 1.55h5.6c.8 0 1.28-.89.83-1.55L14 18h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H3V5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1z"
                  ></path>
                </svg>
              )}
              <div className="device-details">
                <p className="device-uid">{device.uid}</p>
                <p className="device-class">{device.device_class}</p>
              </div>
              <svg
                onClick={() => handleDeleteClick(device)}
                className="delete-device"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
                ></path>
              </svg>
            </li>
          ))}
        </ul>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Device"
        message={
          deviceToDelete ? `Are you sure you want to delete ${deviceToDelete.uid}?` : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Devices;
