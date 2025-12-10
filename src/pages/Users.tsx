// UsersDashboard.tsx
import React, { use, useEffect, useRef, useState } from "react";
import UserDto from "../dtos/UserDto";
import axios from "axios";
import { API_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function UsersDashboard() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [runGetUsersUseEffect, setRunGetUsersUseEffect] = useState<number>(0);

  //get users from api
  useEffect(() => {
    async function fetchUsersAsync() {
      try {
        console.log("Fetching users...");

        const response = await axios.get<UserDto[]>(`${API_URL}user/show`);

        //usersDto[]
        const data = response.data;

        if (!data) return;

        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsersAsync();
  }, [runGetUsersUseEffect]);

  //delete user
  async function deleteUserAsync(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}user/delete/${id}`);

      //update run get users use effect
      setRunGetUsersUseEffect((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  }

  const usersElements = users.map((user) => (
    <tr
      key={user.id}
      className="even:bg-blue-400 cursor-pointer hover:bg-blue-300"
    >
      <td className="p-2">{user.id}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.email_verified_at?.slice(0, 10) || "empty"}</td>
      <td className="p-2">{user.created_at?.slice(0, 10)}</td>
      <td className="p-2">{user.updated_at?.slice(0, 10)}</td>

      <td className="p-2 flex gap-5 justify-center ">
        <Link
          className="bg-green-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 hover:scale-110 transition"
          to={`/dashboard/users/${user.id}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit
        </Link>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 hover:scale-110 transition"
          onClick={(e) => deleteUserAsync(user.id || 0)}
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="users-table-container overflow-x-auto">
        <table className="w-full min-w-[1200px] users-table bg-blue-500 border-[5px] border-blue-800">
          <thead className="p-5">
            <tr>
              <th className="border-b-[5px] p-4 border-blue-800">Id</th>
              <th className="border-b-[5px] p-4 border-blue-800">Name</th>
              <th className="border-b-[5px] p-4 border-blue-800">Email</th>
              <th className="border-b-[5px] p-4 border-blue-800">
                Email Verified At
              </th>
              <th className="border-b-[5px] p-4 border-blue-800">Created At</th>
              <th className="border-b-[5px] p-4 border-blue-800">Updated At</th>
              <th className="border-b-[5px] p-4 border-blue-800">Actions</th>
            </tr>
          </thead>
          <tbody>{usersElements}</tbody>
        </table>
      </div>
    </div>
  );
}
