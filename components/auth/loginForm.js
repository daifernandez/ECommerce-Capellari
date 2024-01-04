"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Image from "next/image";

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
    console.log(values);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <UserIcon className="h-12 w-12 mx-auto text-slate-600" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Início de sesión
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>{" "}
            <div>
              <div className="flex justify-between">
                <button
                  onClick={() => registerUser({ values })}
                  className="flex w-full justify-center rounded-md bg-slate-600 mr-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                >
                  Registrarme
                </button>

                <button
                  onClick={() => loginUser(values)}
                  className="flex w-full justify-center rounded-md bg-slate-600 mx-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                >
                  Ingresar
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* RECORDARME */}
                {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Recordarme
              </label> */}
              </div>
            </div>{" "}
            {/* GOOGLE */}
            <div className="text-sm leading-6">
              <button
                onClick={() => googleLogin()}
                className="w-full bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#357ae8] hover:border-[#357ae8] flex items-center justify-center py-2 px-4  rounded-md"
              >
                <Image
                  src="/google-tile.svg"
                  alt="google"
                  width={25}
                  height={25}
                  className="mr-3 "
                />
                Ingresar con Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
