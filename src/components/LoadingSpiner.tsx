import React from "react";

export default function LoadingSpiner() {
  return (
    <div className="w-full h-full bg-transparent flex justify-center">
      <div className=" w-10 h-10 rounded-full border-[5px] border-blue-500 border-l-transparent animate-spin "></div>
    </div>
  );
}
