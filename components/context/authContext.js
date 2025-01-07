"use client";
import { auth, db } from "../../firebase/config";
import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  const googleProvider = new GoogleAuthProvider();

  const registerUser = async ({ values }) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  const loginUser = async (values) => {
    const result = await signInWithEmailAndPassword(auth, values.email, values.password);
    return result;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser({
      logged: false,
      email: null,
      uid: null,
      isAdmin: false,
    });
    router.push('/');
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error en login con Google:", error);
      toast.error("Error al iniciar sesión con Google");
    }
  };

  const handleUserStateChange = async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const docRef = doc(db, "roles", firebaseUser.uid);
        const userDoc = await getDoc(docRef);
        const isAdmin = userDoc.exists() ? userDoc.data()?.rol === "admin" : false;

        setUser({
          logged: true,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          isAdmin: isAdmin,
        });

        // Redirigir basado en el rol
        if (isAdmin) {
          if (window.location.pathname === '/admin') return; // Evitar redirección innecesaria
          router.push('/admin');
        } else {
          if (window.location.pathname === '/') return; // Evitar redirección innecesaria
          router.push('/');
        }
      } catch (error) {
        console.error("Error verificando rol:", error);
        setUser({
          logged: true,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          isAdmin: false,
        });
        router.push('/');
      }
    } else {
      setUser({
        logged: false,
        email: null,
        uid: null,
        isAdmin: false,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUserStateChange);
    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logOut, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
