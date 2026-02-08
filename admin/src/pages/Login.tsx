import LoginImg from "@assets/images/login.jpg";
import { LoginForm } from "@components/forms";

const Login = () => {
  return (
    <section className="overflow-auto h-screen">
      <div className="flex justify-between">
        <div className="w-full md:w-2/3 hidden md:block">
          <img
            src={LoginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/3">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
