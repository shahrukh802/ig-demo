import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Loader } from "../ui/Loader";

function Login() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const handleChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsErrorMessage("");

    login(signInData.email, signInData.password)
      .then((response) => {
        setIsErrorMessage("");
        localStorage.setItem("authToken", JSON.stringify(response.data));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setIsErrorMessage(
          error?.response?.data?.detail
            ? error?.response?.data?.detail
            : error?.detail
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form className="max-w-md mx-auto" onSubmit={handleSignIn}>
            <div>
              <h1 className="text-2xl font-semibold">Login OR Signup</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={signInData.email}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    onChange={handleChange}
                    value={signInData.password}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    className="bg-secondary text-white rounded-md px-2 py-1"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader heigth="h-6" width="w-10" />
                    ) : (
                      `Submit`
                    )}
                  </button>
                </div>
                {isErrorMessage && (
                  <div
                    className="mb-4 rounded-lg bg-red-200 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-500"
                    role="alert"
                  >
                    {isErrorMessage}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
