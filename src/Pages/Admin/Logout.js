
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  // useEffect to watch for changes in apiData
  useEffect(() => {
    sessionStorage.clear();
    navigate('/home');
  }, []);
}
