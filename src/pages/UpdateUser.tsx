import React, { Activity, FormEvent, use, useEffect, useState } from "react";
import UserDto from "../dtos/UserDto";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateUser() {
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const navigate = useNavigate();

  //fetch user
  useEffect(() => {
    async function fetchUserAsync() {
      try {
        const response = await axios.get<UserDto[]>(
          `${API_URL}user/showbyid/${userId}`
        );

        console.log(response);
        const user = response.data[0];

        //set values
        setName(user.name);
        setEmail(user.email);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserAsync();
  }, []);

  //update user
  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //validation inputsf
    if (name === null || name === "") {
      setErrorMessage("Please set name");
      return;
    }
    if (email === null || email === "") {
      setErrorMessage("Please set email");
      return;
    }
    if (password === null || password === "") {
      setErrorMessage("Please set password");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be 8 characters or more");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
      return;
    }

    //not found any error
    setErrorMessage(null);

    //create user
    const userDto: UserDto = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    //update user
    try {
      const response = await axios.post(
        `${API_URL}user/update/${userId}`,
        userDto
      );

      if (!(response.status === 200) && !(response.status === 201))
        console.log("failed");

      //to show update successfully
      setIsUserUpdated(true);

      console.log("successfully");
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  //to show update successfully
  if (isUserUpdated) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User updated successfully",
      showConfirmButton: false,
      confirmButtonText: "Ok",
      showCancelButton: true,
      allowEscapeKey: true,
    }).then(() => {
      navigate("/dashboard/users");
    });
  }

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="text-black text-start  w-[600px]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-center">
            Update User
          </h1>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleUpdate(e)}
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium "
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="confirm password"
                className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Activity mode={errorMessage === null ? "hidden" : "visible"}>
              <p className="font-bold text-red-600">❌ {errorMessage}</p>
            </Activity>

            <div className=" w-full flex justify-center">
              <div className="bg-blue-500 rounded-lg w-1/2 hover:scale-125 transition duration-300">
                <button
                  type="submit"
                  className="w-full text-white hovee:scale-125 p-2"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
