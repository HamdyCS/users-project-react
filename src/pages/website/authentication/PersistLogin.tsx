import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { authAtom } from "../../../atoms/authAtom";
import RefreshTokenResponseDto from "../../../dtos/Auth/RefreshTokenResponseDto";
import { API_URL } from "../../../config";

export default function PersistLogin() {
  const [auth, setAuth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get<string | null>("BearerToken");

    //not found token. nead to Login
    if (!token) {
      setIsLoading(false);
      return;
    }
    async function refreshTokenAsync() {
      try {
        //refresh token
        const response = await axios.post<RefreshTokenResponseDto>(
          `${API_URL}refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //set new token to token cookie
        cookie.set("BearerToken", response.data.token, {
          path: "/",
          sameSite: "lax",
        });

        //update auth info
        setAuth({
          email: response.data.user.email,
          id: response.data.user.id || -1,
          token: response.data.token,
        });
      } catch (err) {
        console.log(err);
      } finally {
        //set loading false
        setIsLoading(false);
      }
    }

    refreshTokenAsync();
  }, []);

  return isLoading ? (
    <div className="h-screen w-screen flex p-11 justify-center ">
      <div className=" w-10 h-10 rounded-full border-[5px] border-blue-500 border-l-transparent animate-spin "></div>
    </div>
  ) : (
    <Outlet />
  );
}
