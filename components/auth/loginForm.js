"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const { registerUser, loginUser, googleLogin } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const register = () => {
    try {
      registerUser({ values });
      toast.success("Usuario registrado correctamente");
    } catch (error) {
      toast.error("Error al registrar el usuario");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Toaster />
        <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <UserIcon className="h-12 w-12 mx-auto text-slate-600" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Início de sesión
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  required
                  className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 sm:text-sm"
                  placeholder="••••••••"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => loginUser(values)}
                className="flex w-full justify-center rounded-md bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors"
              >
                Ingresar
              </button>

              <button
                onClick={() => register()}
                className="flex w-full justify-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-colors"
              >
                Registrarme
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
    </>
  );
}
