import React, { useState } from "react";
import { useRouter } from "next/router";

const AddFormTeacher = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [state, setState] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = {
      name,
      surname,
      email,
      course,
      dateInitial,
      state
    };

    const response = await fetch("/api/teacher", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataForm),
    });

    if (response.ok) {
      router.push("/");
    } else {
      setErrorMessage("No se pudo agregar");
    }
    
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white/50 py-5 px-10 rounded-xl shadow-2xl">
      <h2 className="text-3xl my-4 font-bold text-violet-700">Agregar Docente</h2>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label>Nombres:</label><br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label>Apellidos:</label><br/>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label>Cursos:</label><br/>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label>Fecha de Inicio:</label><br/>
          <input
            type="date"
            value={dateInitial}
            onChange={(e) => setDateInitial(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label>Estado</label><br/>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <button type="submit" className="bg-violet-500 text-white px-5 py-2 my-3 rounded-md">Agregar</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      </div>
    </div>
  );
}

export default AddFormTeacher