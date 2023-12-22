"use client";
import { auth, googleProvider, db } from "../../firebase/config";
import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
    isAdmin: false,
  });

  const router = useRouter();

  const registerUser = async ({ values }) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  const loginUser = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        // Manejar el cierre del popup por el usuario
        console.log(
          "El usuario cerró el popup antes de finalizar la autenticación."
        );
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "roles", user.uid);
        const userDoc = await getDoc(docRef);

        if (userDoc.data()?.rol === "admin") {
          setUser({
            logged: true,
            email: user.email,
            uid: user.uid,
            isAdmin: true,
          });
        } else {
          router.push("/unauthorized");
          logOut();
        }
      } else {
        setUser({
          logged: false,
          emaiL: null,
          uid: null,
          isAdmin: false,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logOut, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
