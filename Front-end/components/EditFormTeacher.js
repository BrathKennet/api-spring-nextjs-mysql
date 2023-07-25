import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';

const EditFormTeacher = ({id}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [state, setState] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const getData = async () => {

    if(id) {
      const response = await fetch(`/api/teacher/${id}`);
  
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setName(data.name)
          setSurname(data.surname)
          setEmail(data.email)
          setCourse(data.course)
          setDateInitial(data.dateInitial)
          setState(data.state)
        } else {
          router.push("/");
        }
      }
    }

  }

  useEffect(() => {
    getData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = {
      name,
      surname,
      email,
      course,
      dateInitial,
      state,
    };

    const response = await fetch(`/api/teacher/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataForm),
    });

    if (response.ok) {
      router.push("/");
    } else {
      setErrorMessage("No se pudo actualizar");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className='text-4xl font-bold'>Editar Docente</h2>
      <form onSubmit={handleSubmit} className="flex flex-col p-5 rounded-xl bg-white/50 my-10 shadow-2xl">
        <div>
          <label className='text-xl font-bold'>Nombres: </label><br/> 
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Apellidos: </label><br/>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Email: </label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Cursos: </label><br/>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Fecha de Inicio: </label><br/>
          <input
            type="date"
            value={dateInitial}
            onChange={(e) => setDateInitial(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Estado </label><br/>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-60 rounded-md p-1 my-2 border-2 border-blue-500 text-center"
          />
        </div>
        <button type="submit" className="bg-violet-500 text-white px-5 py-2 my-3 rounded-md">Guardar Cambios</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditFormTeacher