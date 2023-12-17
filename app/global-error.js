"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              Lo sentimos
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Algo no salió bien
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {error.message}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={() => reset()}>Reintentar</button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
