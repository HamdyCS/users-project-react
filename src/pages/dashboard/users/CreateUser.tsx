import React from "react";
import UserForm from "../../../components/Froms/UserForm";

export default function CreateUser() {
  return (
    <div className="create-user h-full flex items-center justify-center">
      <UserForm type="Create" navigateTo="/dashboard/users" />
    </div>
  );
}
