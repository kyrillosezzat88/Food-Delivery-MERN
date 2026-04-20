import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@assets/images/logo.png";
import axios from "axios";
type VerifyStatus = "verifying" | "success" | "error";

const VerifyEmail = () => {
  const [status, setStatus] = useState<VerifyStatus>("verifying");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const verify = async () => {
      try {
        await axios.post(`auth/verify-email?token=${token}`).then((res) => {
          console.log("Verification response:", res.data);
          if (res.data.status === 200) {
            setStatus("success");
          }
        });
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  // ── Verifying (loading) ──
  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
            <div className="absolute inset-0 rounded-full border-4 border-tomato border-t-transparent animate-spin" />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800">
              Verifying your email
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" className="h-10" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-medium text-gray-800">
                Verification failed
              </h1>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                This link is invalid or has expired. Verification links are only
                valid for 24 hours.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="w-full bg-tomato text-white py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
              >
                Back to Sign In
              </button>
              <button
                onClick={() => {
                  // wire up resend logic here
                  // e.g. await axios.post("/api/auth/resend-verification")
                }}
                className="w-full border border-gray-200 text-gray-500 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Resend verification email
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Need help?
              <span className="text-tomato hover:underline cursor-pointer">
                Contact support
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ──
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="logo" className="h-10" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 flex flex-col items-center gap-6 text-center">
          {/* Animated checkmark */}
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-30" />
          </div>

          <div>
            <h1 className="text-xl font-medium text-gray-800">
              Email verified!
            </h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Your email has been successfully verified. You can now sign in and
              start ordering.
            </p>
          </div>

          {/* What's next */}
          <div className="w-full bg-gray-50 rounded-2xl px-5 py-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-gray-500 text-left">
              What's next
            </p>
            {[
              { step: "1", label: "Sign in to your account" },
              { step: "2", label: "Browse our menu" },
              { step: "3", label: "Place your first order" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-tomato/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-tomato">
                    {item.step}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/auth")}
            className="w-full  bg-primary cursor-pointer text-white py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
          >
            Sign In Now
          </button>

          <p className="text-xs text-gray-400">
            Having trouble?
            <span className="text-primary hover:underline cursor-pointer">
              Contact support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;
