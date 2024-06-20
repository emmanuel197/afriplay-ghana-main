// src/components/UnsubscribedUser.jsx
import React from 'react';
import '../components/styles/unsubscribedUser.scss'
import { nocart } from '../../utils/assets'; // Ensure you have the empty cart icon in this path
import Button from './buttons/Button';
import { useNavigate } from 'react-router-dom';
const UnsubscribedUser = () => {
  const navigate = useNavigate()
  return (
    <div className="unsubscribed-user">
      <img src={nocart} alt="Empty Cart Icon" className="empty-cart-icon" />
      <p className="unsubscribed-message">
        You have no active subscriptions. Choose your desired data bundle from the available data bundles list to enjoy amazing MTN TV+ content
      </p>
      <div className='unsubscribed-button'>
      <Button action={() => navigate('/subscriptions')}  label='Subscribe'/>
      </div>
      
    </div>
  );
};

export default UnsubscribedUser;
