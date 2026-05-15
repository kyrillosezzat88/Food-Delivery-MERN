import { Link } from "react-router-dom";

type ErrorMessageProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionLink?: string;
  className?: string;
};

const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't complete this request. Please try again or head back to the homepage.",
  actionLabel = "Go back home",
  actionLink = "/",
  className = "",
}: ErrorMessageProps) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white px-8 py-14 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-red-100 blur-2xl" />
        <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm text-gray-500">{message}</p>
        {actionLink ? (
          <Link
            to={actionLink}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-tomato/90"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorMessage;
