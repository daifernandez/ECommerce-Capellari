"use Client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
