import React, { useState } from "react";
import { Loader } from "../ui/Loader";
import { changePassword } from "../../services/ApiService";
import ToggleDarkModeComponent from "../ToggleDarkMode";

const Settings = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
  });
  const [successResponse, setSuccessResponse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessResponse("");
    if (formData.password === formData.new_password) {
      setErrorMessage("Current password should not be equal to new password!");
      return;
    }
    setIsLoading(true);
    changePassword(formData)
      .then((response) => {
        setErrorMessage("");
        setSuccessResponse(response.data.detail);
      })
      .catch((error) => {
        setErrorMessage(
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
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto dark:text-white">
      <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <form
          className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 dark:bg-[#111111] sm:px-8 sm:shadow"
          onSubmit={handleSubmit}
        >
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold">Toggle Dark Mode</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 dark:text-white">
              Please toggle to change darkmode on/off
            </p>
            <ToggleDarkModeComponent />
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold">Password</p>
          <div className="flex items-center">
            <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500">Current Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    type="password"
                    id="login-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </label>
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500">New Password</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition">
                  <input
                    type="password"
                    id="login-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        new_password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </label>
            </div>
          </div>
          <button className="mt-4 rounded-lg bg-secondary px-4 py-2 text-white">
            {isLoading ? <Loader heigth="h-6" width="w-10" /> : `Save Password`}
          </button>
          {errorMessage && (
            <div
              className="mt-2 rounded-lg bg-red-200 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-500"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {successResponse && (
            <div
              className="mt-2 rounded-lg bg-green-200 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-500"
              role="alert"
            >
              {successResponse}
            </div>
          )}
          <hr className="mt-4 mb-8" />
        </form>
      </div>
    </div>
  );
};

export default Settings;
