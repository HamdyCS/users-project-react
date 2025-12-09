// UsersDashboard.tsx
import React, { use, useEffect, useState } from "react";
import UserDto from "../../dtos/UserDto";
import axios from "axios";
import { API_URL } from "../../config";

export default function UsersDashboard() {
  const [users, setUsers] = useState<UserDto[]>([]);

  //get users from api
  useEffect(() => {
    async function fetchUsersAsync() {
      try {
        const response = await axios.get<UserDto[]>(`${API_URL}user/show`);

        //usersDto[]
        const data = response.data;

        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsersAsync();
  }, []);

  const usersElements = users.map((user) => (
    <tr
      key={user.id}
      className="even:bg-blue-400 cursor-pointer hover:bg-blue-300"
    >
      <td className="p-2">{user.id}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.email_verified_at || "empty"}</td>
      <td className="p-2">{user.created_at}</td>
      <td className="p-2">{user.updated_at}</td>

      <td className="p-2 flex gap-5 justify-center ">
        <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
