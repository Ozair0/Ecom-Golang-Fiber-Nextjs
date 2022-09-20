import { HandIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FormEvent, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../util/axios";
import { auth_login } from "../store/userAuth";

export default function Signup() {
  const auth = useSelector((state: RootState) => state.userAuth.loggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useLayoutEffect(() => {
    if (!router.isReady) return;
    if (auth) router.push("/");
  }, [auth, router, router.isReady]);
  const signUp = (event: FormEvent) => {
    event.preventDefault();
    if (firstName.trim() === "") alert("First Name cannot be empty!");
    else if (lastName.trim() === "") alert("Last Name cannot be empty!");
    else if (email.trim() === "") alert("Email cannot be empty!");
    else if (password.trim() === "") alert("Password cannot be empty!");
    else if (confirmPassword.trim() === "")
      alert("Confirm Password cannot be empty!");
    else if (password.trim() !== confirmPassword.trim())
      alert("Passwords did not match!");
    else {
      axios
        .post("register", {
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          email: email.trim(),
          password: password.trim(),
          password_confirm: confirmPassword.trim(),
        })
        .then((res) => {
          dispatch(auth_login(true));
          router.push("/");
        })
        .catch((error) => error);
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign Up for an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="firstname" className="sr-only">
                  Fist Name
                </label>
                <input
                  onInput={(event) => setFirstName(event.currentTarget.value)}
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Fist Name"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="sr-only">
                  Last Name
                </label>
                <input
                  onInput={(event) => setLastName(event.currentTarget.value)}
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onInput={(event) => setEmail(event.currentTarget.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onInput={(event) => setPassword(event.currentTarget.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm_password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  onInput={(event) =>
                    setConfirmPassword(event.currentTarget.value)
                  }
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              {/*<div className="text-sm">*/}
              {/*  <a*/}
              {/*    href="#"*/}
              {/*    className="font-medium text-indigo-600 hover:text-indigo-500"*/}
              {/*  >*/}
              {/*    Forgot your password?*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>

            <div>
              <button
                onClick={signUp}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HandIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
