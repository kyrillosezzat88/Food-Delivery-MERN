type AuthMode = "login" | "signup";

interface AuthTabsProps {
  mode: AuthMode;
  onToggle: (mode: AuthMode) => void;
}

const AuthTabs = ({ mode, onToggle }: AuthTabsProps) => {
  return (
    <div className="flex border-b border-gray-100">
      {(["login", "signup"] as AuthMode[]).map((m) => (
        <button
          key={m}
          onClick={() => onToggle(m)}
          className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${
            mode === m
              ? "text-tomato border-b-2 border-tomato bg-white"
              : "text-gray-400 hover:text-gray-600 bg-gray-50"
          }`}
        >
          {m === "login" ? "Sign In" : "Create Account"}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;
export type { AuthMode };
