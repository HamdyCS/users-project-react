import React, { Activity, FormEvent, useEffect, useState } from "react";
import UserDto from "../../dtos/UserDto";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms/atom";
import { saveToLocalStorage } from "../../services/localStorageService";

interface UserFormProps {
  name?: string;
  email?: string;
  userId?: string;
  type: "Update" | "Register" | "Create";
  navigateTo: string;
}

export default function UserForm(userFormProps: UserFormProps) {
  const [name, setName] = useState(userFormProps.name || "");
  const [email, setEmail] = useState(userFormProps.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  //use it if form used type is register
  const [token, setToken] = useAtom(tokenAtom);

  //use it if form used type is create or register
  const [isActionDone, setIsActionDone] = useState(false);

  //update name and email from props
  useEffect(() => {
    setName(userFormProps.name || "");
    setEmail(userFormProps.email || "");
  }, [userFormProps.name, userFormProps.email]);

  //to show update successfully if type is update or create and navigate
  useEffect(() => {
    if (!isActionDone) return;

    Swal.fire({
      position: "center",
      icon: "success",
      title: `User ${
        userFormProps.type === "Update" ? "updated" : "created"
      } successfully`,
      showConfirmButton: false,
      confirmButtonText: "Ok",
      showCancelButton: true,
      allowEscapeKey: true,
    }).then(() => {
      navigate(userFormProps.navigateTo);
    });
  }, [isActionDone]);

  //validetion form
  function isFormValid(): boolean {
    //validation inputs
    if (!name || name === "") {
      setErrorMessage("Please set name");
      return false;
    }
    if (!email || email === "") {
      setErrorMessage("Please set email");
      return false;
    }
    if (!password || password === "") {
      setErrorMessage("Please set password");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be 8 characters or more");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
      return false;
    }

    //not found any error
    setErrorMessage(null);
    return true;
  }

  //handel register
  async function handleRegisterAsync(
    e: FormEvent<HTMLFormElement>,
    userDto: UserDto
  ) {
    const response = await axios.post(`${API_URL}register`, userDto);

    //save token
    saveToLocalStorage("token", response.data.data.token);

    //update token atom
    setToken(response.data.data.token);

    //redirect
    navigate(userFormProps.navigateTo);

    console.log("successfully");
    console.log(response.data);
  }

  //handel create
  async function handleCreateAsync(
    e: FormEvent<HTMLFormElement>,
    userDto: UserDto
  ) {
    const response = await axios.post(`${API_URL}user/create`, userDto);

    //redirect
    setIsActionDone(true);

    console.log("successfully");
    console.log(response.data);
  }

  //handel update
  async function handleUpdateAsync(
    e: FormEvent<HTMLFormElement>,
    userDto: UserDto
  ) {
    const response = await axios.post(
      `${API_URL}user/update/${userFormProps.userId}`,
      userDto
    );

    //to show update successfully
    setIsActionDone(true);

    console.log("successfully");
    console.log(response.data);
  }

  //handel submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //check if form is valid
    if (!isFormValid()) {
      return;
    }

    //create user
    const userDto: UserDto = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      //register
      if (userFormProps.type === "Register") {
        await handleRegisterAsync(e, userDto);
      }

      //create
      if (userFormProps.type === "Create") {
        await handleCreateAsync(e, userDto);
      }

      //update
      if (userFormProps.type === "Update") {
        await handleUpdateAsync(e, userDto);
      }
    } catch (error: any) {
      if (
        (userFormProps.type === "Register" ||
          userFormProps.type === "Create") &&
        error.response?.status === 422
      ) {
        setErrorMessage("Email already exists");
      }

      console.log(error);
    }
  }

  return (
    <div className="text-black text-start  w-[600px]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-center">
          {(userFormProps.type === "Register" && "Sign up") ||
            (userFormProps.type === "Update" && "Update User") ||
            (userFormProps.type === "Create" && "Create User")}
        </h1>

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={(e) => handleSubmit(e)}
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
            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
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
                {userFormProps.type}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
