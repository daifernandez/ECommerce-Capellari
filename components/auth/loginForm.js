"use client";
import { UserIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function LoginForm() {
  const { registerUser, loginUser, googleLogin } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await loginUser(values);
      const uid = userCredential.user.uid;
      
      // Opcional: Verificar si el usuario ya es admin
      const userDoc = await getDoc(doc(db, "roles", uid));
      console.log("Documento de roles:", {
        exists: userDoc.exists(),
        data: userDoc.data(),
        uid: uid
      });

      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error completo:", error);
      if (error.code === "auth/wrong-password") {
        toast.error("Contraseña incorrecta");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No existe una cuenta con este correo");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Correo electrónico inválido");
      } else {
        toast.error("Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    setIsLoading(true);
    try {
      await registerUser({ values });
      toast.success("Usuario registrado correctamente");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Este correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        toast.error("La contraseña debe tener al menos 6 caracteres");
      } else {
        toast.error("Error al registrar el usuario");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Toaster />
      <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <UserIcon className="h-12 w-12 mx-auto text-slate-600" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Início de sesión
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={values.email}
                required
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 sm:text-sm"
                placeholder="tucorreo@ejemplo.com"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  required
                  className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 sm:text-sm"
                  placeholder="••••••••"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </button>

            <button
              type="button"
              onClick={register}
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Cargando..." : "Registrarme"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">O continúa con</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-3 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/google-tile.svg"
                alt="google"
                width={20}
                height={20}
                priority
              />
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
