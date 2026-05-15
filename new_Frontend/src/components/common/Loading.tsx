type LoadingProps = {
  message?: string;
};

const Loading = ({
  message = "Preparing something delicious...",
}: LoadingProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
      <div className="relative flex w-full max-w-md flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-white/95 px-8 py-12 text-center shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm">
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-tomato/10 blur-2xl" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/5 shadow-inner shadow-primary/10">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🍲</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-900">{message}</p>
          <p className="text-sm text-gray-500">
            Hold tight — we&apos;re fetching the freshest details for you.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary animate-bounce" />
          <span
            className="h-3 w-3 rounded-full bg-primary/70 animate-bounce"
            style={{ animationDelay: "0.12s" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: "0.24s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
