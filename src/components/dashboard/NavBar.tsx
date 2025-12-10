import React from "react";
import Container from "../Container";
import { Link } from "react-router-dom";

export default function DashboardNavBar() {
  return (
    <div className="bg-blue-400 p-5 ">
      <Container className="flex justify-between items-center font-bold text-white ">
        <p>Login project</p>
        <Link to={"/"}>Home</Link>
      </Container>
    </div>
  );
}
