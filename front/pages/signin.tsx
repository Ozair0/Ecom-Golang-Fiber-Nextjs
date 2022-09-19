import { LockClosedIcon } from "@heroicons/react/solid";
import { FormEvent, useLayoutEffect, useState } from "react";
import axios from "../util/axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { auth_login } from "../store/userAuth";

function Signin() {
  const auth = useSelector((state: RootState) => state.userAuth.loggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  useLayoutEffect(() => {
    if (auth) router.push("/");
  }, [auth, router, router.isReady]);

  const login = (event: FormEvent) => {
    console.log(auth);
    event.preventDefault();
    axios
      .post("login", {
        email,
        password,
      })
      .then((res) => {
        dispatch(auth_login(true));
        router.push("/");
      })
      .catch((error) => error);
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  // @ts-ignore
                  onInput={(event) => setEmail(event.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  // @ts-ignore
                  onInput={(event) => setPassword(event.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
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
                onClick={login}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
