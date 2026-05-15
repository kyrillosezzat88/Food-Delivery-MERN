import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-gray-100 bg-white px-8 py-16 text-center shadow-sm">
        <p className="text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-6 text-3xl font-semibold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          The page you re looking for doesnxist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-tomato/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
