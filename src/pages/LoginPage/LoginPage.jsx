import React, { useState } from "react";
import Lottie from "lottie-react";
import lottieBee from "../../assets/BeeAnimation1.json";
import { Button } from "../../components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { POST_LOGIN_DATA } from "../../../axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [err, setErr] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone_number = form.phone.value;
    const password = form.password.value;

    const loginData = { phone_number, password };

    console.log(loginData);

    POST_LOGIN_DATA(loginData, (err, data) => {
      if (err) {
        console.log("Error: ", err);
        setErr("Can't login please check you info");
        return;
      }
      console.log("Response from backend:", data);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E79A3F]">
      <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg bg-black/60 p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-white text-center">
          Welcome to <span className="text-3xl text-white">Solid</span>{" "}
          <span className="text-honey">Honey</span>
        </h1>
        <h1 className="text-3xl text-center text-white font-semibold">
          Login Here
        </h1>
        <div className="flex gap-16 items-center">
          <div className="w-[40%] -mt-28">
            <Lottie animationData={lottieBee} />
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid mb-4">
              <label htmlFor="phone" className="text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter phone number"
                maxLength={11}
              />
            </div>

            <div className="grid mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <Button
              className=" items-center "
              variant="default"
              type="submit"
              size="lg"
            >
              Login
            </Button>
          </form>
        </div>
        <div className="mt-5">
          <p className="text-white text-sm text-center underline">
            Forgot your password?
          </p>
          <p className="text-white text-sm text-center font-semibold">
            Contact the administrator
          </p>
          <Link to="/">
            <p>Go to home</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
