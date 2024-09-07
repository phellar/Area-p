import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../Config/SupabaseClient';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner or message.
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
