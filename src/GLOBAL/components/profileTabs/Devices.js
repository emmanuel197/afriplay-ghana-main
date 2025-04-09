import React, { useEffect, useState } from "react";
import { fetchUserDevices, deleteUserDevice } from "../../redux/account";
import "../../components/styles/Devices.scss";
import ConfirmationModal from "../../components/confirmationModal"
const Devices = ({ active }) => {
  // 1. Create state for devices, loading, and errors
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   // For delete confirmation
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [deviceToDelete, setDeviceToDelete] = useState(null);
  // 2. Fetch devices on mount

  const handleDeleteClick = (device) => {
    setDeviceToDelete(device);
    setIsDeleteModalOpen(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeviceToDelete(null);
  };
  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchUserDevices();
        // Adjust depending on how your API returns data:
        // e.g., if response is an array, set directly
        // if response has data in response.data, set that instead
        console.log(response);
        setDevices(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 3. Only render content if active tab is "devices"
  if (active !== "devices") return null;

  // 4. Show loading or error states if needed
  if (loading) return <div>Loading devices...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(devices);
  return (
    <div className="devices-tab">
      <h3 className="devices-tab-header">My Devices</h3>
      {devices.length === 0 ? (
        <p className="no-devices-found">No devices found.</p>
      ) : (
        <ul className="devices-list">
          {devices.map((device, index) => (
            <li className="device-wrapper" key={index}>
              {/* Render device details; adjust fields as needed */}
              {device.device_class === "DESKTOP" ? <svg className="device-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2M7 16.999V5h10l.002 11.999z"></path></svg> :
              <svg className="device-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"   preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-1.63 2.45c-.44.66.03 1.55.83 1.55h5.6c.8 0 1.28-.89.83-1.55L14 18h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H3V5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1z"></path></svg>}
              <div className="device-details">
              <p className="device-uid">{device.uid}</p>
              <p className="device-class">{device.device_class}</p>
              </div>
              <svg onClick={() => handleDeleteClick(device)} 
              className="delete-device" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              aria-hidden="true" 
              role="img"  
              preserveAspectRatio="xMidYMid meet" 
              viewBox="0 0 24 24">
                <path fill="currentColor" 
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z">
                </path>
                </svg>
             </li>
          ))}
        </ul>
      )}
      <ConfirmationModal
        // isOpen={isDeleteModalOpen}
        title="Delete Device"
        message={
          deviceToDelete
            ? `Are you sure you want to delete ${deviceToDelete.uid}?`
            : ""
        }
        onConfirm={() => deleteUserDevice(deviceToDelete.id)}
        onCancel={ handleCancelDelete}
      />
    </div>
  );
};

export default Devices;