import axios from "axios";
import { useAtom } from "jotai";
import { Activity, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../../atoms/authAtom";
import { API_URL } from "../../../config";
import LoginDto from "../../../dtos/Auth/LoginDto";
import LoginResponseDto from "../../../dtos/Auth/LoginResponseDto";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const [auth, setAuth] = useAtom(authAtom);

  async function handleLogin(e: FormEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault();

    //validation
    if (email === "") {
      setErrorMessage("Please set email");
      return;
    }

    if (password === "") {
      setErrorMessage("Please set password");
      return;
    }

    //no errors found
    setErrorMessage(null);

    //create login dto
    const loginDto: LoginDto = {
      email,
      password,
    };
    //login
    try {
      const response = await axios.post<LoginResponseDto>(
        `${API_URL}login`,
        loginDto
      );

      if (!(response.status === 200) && !(response.status === 201)) {
        return;
      }

      const loginResponseDto: LoginResponseDto = response.data;

      //save token to cookie
      const cookie = new Cookies();
      cookie.set("BearerToken", loginResponseDto.data.token, {
        path: "/",
        sameSite: "lax",
      });

      //save auth info to context
      setAuth({
        email: loginResponseDto.data.user.email,
        id: loginResponseDto.data.user.id || -1,
        token: loginResponseDto.data.token,
      });

      //redirect
      navigate("/");
    } catch (error: any) {
      if (error.response.status === 401) {
        setErrorMessage("Wrong email or password");
        return;
      }
    }
  }

  return (
    <section>
      <div className="flex bg-gray-900 h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100 text-start"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/"}
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <Activity mode={errorMessage === null ? "hidden" : "visible"}>
              <p className="font-bold text-red-600">❌ {errorMessage}</p>
            </Activity>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={(e) => handleLogin(e)}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
