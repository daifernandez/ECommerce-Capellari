import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";

export default function NavbarCategory({ categoria }) {
  return (
    <nav
      className="flex border-b border-gray-200 bg-white mb-10"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
      >
        <li className="flex">
          <div className="flex items-center">
            <div className="text-gray-400 hover:text-gray-500">
              <CursorArrowRaysIcon
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </div>
          </div>
        </li>

        <li key={categoria} className="flex">
          <div className="flex items-center">
            <svg
              className="h-full w-6 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a
              href={categoria}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 sm:truncate"
            >
              {categoria}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}
