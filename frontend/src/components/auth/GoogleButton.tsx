import GoogleIcon from "@assets/icons/google.svg";
const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        <img src={GoogleIcon} alt="Google" className="h-5 w-5" />
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">or continue with email</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
    </>
  );
};

export default GoogleButton;
