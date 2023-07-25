import React from 'react'
import { useState } from "react";
import { hasAccessToken } from "@/utilities/utility";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const [accessTokenExists, setAccessTokenExists] = useState(false);

  useEffect(() => {
    setAccessTokenExists(hasAccessToken());
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken"); // Clear the accessToken from localStorage on the client-side
    }
    setAccessTokenExists(false);
    router.push("/login"); // Redirect to the login page after logout
  };

  return (
    <div>
      {accessTokenExists && (
        <button
          onClick={handleLogout}
          className=" text-xl bg-slate-700 text-white rounded-md my-3 mx-3 py-3 px-7 hover:bg-slate-300 hover:text-black duration-500"
        >
          Cerrar Sesión
        </button>
      )}
      <br />
    </div>
  );
}

export default Logout