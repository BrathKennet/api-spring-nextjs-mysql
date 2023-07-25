import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const LoginForm = ({toggleForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      type: "login",
    };

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const resJson = await response.json()
      const accessToken = resJson.accessToken;
      
      if (accessToken) {
        setErrorMessage("");
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      } else {
        setErrorMessage("Credenciales inválidas. Inténtalo nuevamente.");
      }

    } else {
      console.log("Error", response.status)
    }
  };

  return (
    <div className="flex flex-nowrap w-screen">
    <div className="flex flex-col justify-center items-center w-2/5 h-screen bg-gradient-to-b from-amber-300 to-blue-500">
      <div className="flex flex-col justify-center  bg-white/50 rounded-xl m-10 p-5 shadow-2xl">
      <h2 className="text-4xl mt-8 font-bold text-blue-600">INICIAR SESIÓN</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-10">
        <div>
          <label className="text-xl font-bold text-blue-600">Correo</label><br/>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-60 rounded-md p-2 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className="text-xl font-bold text-blue-600">Contraseña</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-60 rounded-md p-2 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <button className="bg-blue-500 text-white px-5 py-3 my-3 rounded-md" type="submit">Iniciar sesión</button>
        {errorMessage && <p style={{ color:"red" }}>{errorMessage}</p>}
      </form>
      <button className="bg-violet-500 text-white px-5 py-2 my-3 rounded-md" onClick={toggleForm}>Registrarse Ahora</button>
      </div>    
    </div>
      <div style={{
        background:`url('/img/loginbg2.jpg')`,
        width:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
      }} >
        <div className="flex flex-wrap justify-center w-full my-10">
          <Image className="mx-10" src="/img/logofis2.png" alt="" width={200} height={200}/>
          <Image src="/img/logouncp.png" alt="" width={300} height={250}/>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl text-white font-bold">ASISTENCIA FIS</h1>
          <h2 className="text-3xl text-white font-bold">El sistema para control de asistencia para la FIS</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
