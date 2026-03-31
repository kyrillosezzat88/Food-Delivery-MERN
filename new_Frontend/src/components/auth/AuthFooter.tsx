import type { AuthMode } from "./AuthTabs";

interface AuthFooterProps {
  mode: AuthMode;
  onToggle: (mode: AuthMode) => void;
}

const AuthFooter = ({ mode, onToggle }: AuthFooterProps) => {
  return (
    <p className="text-center text-sm text-gray-400">
      {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
      <button
        onClick={() => onToggle(mode === "login" ? "signup" : "login")}
        className="text-tomato font-medium hover:underline"
      >
        {mode === "login" ? "Sign up" : "Sign in"}
      </button>
    </p>
  );
};

export default AuthFooter;
