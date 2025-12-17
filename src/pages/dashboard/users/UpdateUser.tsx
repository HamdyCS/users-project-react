import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../../../components/Froms/UserForm";
import UserDto from "../../../dtos/UserDto";
import { API_URL } from "../../../config";
import { authAtom } from "../../../atoms/authAtom";
import { useAtom } from "jotai";

export default function UpdateUser() {
  const { userId } = useParams();

  const [auth, setAuth] = useAtom(authAtom);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //fetch user
  useEffect(() => {
    async function fetchUserAsync() {
      try {
        const response = await axios.get<UserDto[]>(
          `${API_URL}user/showbyid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        const user = response.data[0];

        //set values
        setName(user.name);
        setEmail(user.email);
      } catch (err) {}
    }

    fetchUserAsync();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <UserForm
        type="Update"
        name={name}
        email={email}
        userId={userId}
        navigateTo="/dashboard/users"
      />
    </div>
  );
}
