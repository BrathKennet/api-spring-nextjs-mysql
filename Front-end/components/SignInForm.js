import React, { useState } from "react";
import { useRouter } from "next/router";

const SignInForm = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      type: "signin",
    };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const resJson = await response.json();
      const accessToken = resJson.accessToken;

      if (accessToken) {
        setErrorMessage("");
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      } else {
        setErrorMessage("Usuario Existente.");
      }
    } else {
      console.log("Error", response.status);
    }
  };

  return (
    <>
    <div className="w-screen h-screen flex flex-col items-center">
    <h2 className="text-5xl font-bold my-10 text-white">Registrate</h2>

      <form onSubmit={handleSubmit} className="flex flex-col p-10 rounded-lg bg-white/50 w-96 shadow-2xl" >
        <div>
          <label className="text-3xl font-bold text-blue-600">Correo</label><br/>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-4 border-blue-400 p-2 rounded-lg my-3 w-full"
          />
        </div>
        <div>
          <label className="text-3xl font-bold text-blue-600">Contraseña</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-4 border-blue-400 p-2 rounded-lg my-3 w-full"
          />
        </div>
        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg my-5" type="submit">Registrate</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg my-5" onClick={toggleForm}>Iniciar Sesión</button>
    </div>
      
    </>
  );
};

export default SignInForm;
