import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

const ListTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`/api/teacher`)
      if (response.ok) {
        const data = await response.json()
        setTeachers(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteTeacher = async (id) => {
    try {
      const res = await fetch(`/api/teacher/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-5">
      {teachers.map((teacher) => (
        <div className="flex flex-col w-auto px-10 py-4 m-4 bg-white shadow-2xl rounded-xl" key={teacher.id}>
          <p className="my-2"><span className="font-bold">Apellidos: </span>{teacher.surname}</p>
          <p className="my-2"><span className="font-bold">Nombre:</span> {teacher.name}</p>
          <p className="my-2"><span className="font-bold">Correo Electronico:</span> {teacher.email}</p>
          <p className="my-2"><span className="font-bold">Estado:</span> {teacher.state}</p>
          {/* Agrega aquí otros campos que desees mostrar */}
          <div className="flex flex-wrap justify-center w-100 my-3">
          <Link
            href={`/editteacher?id=${teacher.id}`}
            className="bg-emerald-600 w-24 text-center text-white px-5 py-2 mx-2 rounded-md"
          >
            Editar
          </Link>
          <Link
            href="/"
            onClick={() => deleteTeacher(teacher.id)}
            className="bg-red-500 w-24 text-center text-white px-5 py-2 mx-2 rounded-md"
          >
            Eliminar
          </Link>
          <Link
            href={`/infoteacher?id=${teacher.id}`}
            className="bg-amber-500 w-24 text-center text-white px-5 py-2 mx-2 rounded-md"
          >
            Ver
          </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTeachers;
