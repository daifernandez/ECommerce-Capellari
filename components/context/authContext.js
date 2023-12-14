"use client";
import { auth } from "../../firebase/config";
import { createContext, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });
  
  const registerUser = async ({ values }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(userCredential);

    const user = userCredential.user;
    setUser({
      logged: true,
      email: user.email,
      uid: user.uid,
    });
  };

  const loginUser = async (values) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;
    setUser({
      logged: true,
      email: user.email,
      uid: user.uid,
    });
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
