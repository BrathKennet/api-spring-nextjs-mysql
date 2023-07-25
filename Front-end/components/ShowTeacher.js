import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ShowTeacher = ({id}) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [state, setState] = useState("");

  const router = useRouter()

  const getData = async () => {
    if (id) {
      const response = await fetch(`/api/teacher/${id}`);

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setName(data.name);
          setSurname(data.surname);
          setEmail(data.email);
          setCourse(data.course);
          setDateInitial(data.dateInitial);
          setState(data.state);
        } else {
          router.push("/");
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col py-5 px-10 rounded-xl bg-white shadow-2xl'>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Nombres:</span> {name}</p>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Apellidos:</span> {surname}</p>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Email:</span> {email}</p>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Curso:</span> {course}</p>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Fecha de Inicio:</span> {dateInitial}</p>
      <p className='my-1 text-2xl'><span className='font-bold text-blue-500'>Estado:</span> {state}</p>
    </div>
  )
}

export default ShowTeacher