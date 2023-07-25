import { useAuth } from '@/utilities/auth'
import React from 'react'
import { useRouter } from 'next/router';
import ShowTeacher from '@/components/ShowTeacher';
import Link from 'next/link';

const InfoTeacher = () => {

  useAuth();

  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='flex flex-col items-center w-screen h-screen bg-gradient-to-b from-emerald-300 to-blue-500 '>
      <h1 className='text-3xl my-4 font-bold'>Información del Docente</h1>
      {id && <ShowTeacher id={id} />}
      <br/>
      <Link href={"/"} className="w-min bg-red-500 text-white p-3 m-2 rounded-md">
        Regresar
      </Link>
    </div>
  );
}

export default InfoTeacher