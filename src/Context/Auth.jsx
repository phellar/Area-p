// import React, { createContext, useContext, useEffect, useState } from 'react';
// import supabase from '../Config/SupabaseClient';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const currentSession = supabase.auth.getSession();
//     setSession(currentSession.data.session);

//     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={session}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
