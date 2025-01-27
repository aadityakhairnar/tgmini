import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TelegramAuth() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    
    if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
      const { username } = telegram.initDataUnsafe.user;
      
      // Try to login first, if it fails, try to register
      login(username).catch(() => {
        register(username);
      }).then(() => {
        navigate('/profile');
      });
    }
  }, []);

  return null; // This component doesn't render anything
}

export default TelegramAuth;