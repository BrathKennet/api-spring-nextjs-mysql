import React from 'react'
import { useRouter } from 'next/router';
import EditFormTeacher from '@/components/EditFormTeacher';
import { useAuth } from '@/utilities/auth';
import Link from 'next/link';

const EditTeacher = () => {

  useAuth();

  const router = useRouter();
  const { id } = router.query;

  return (
    <div  className='w-screen h-screen bg-gradient-to-b from-pink-300 to-violet-400'>
       <Link href={"/"} className="w-min bg-red-500 text-white p-3 m-2 rounded-md">
        Regresar
      </Link>
      {/*<p>Teacher ID: {id}</p>*/}
      {id && <EditFormTeacher id={id} />}
      {/* Aquí puedes agregar el formulario de edición y otras lógicas */}
    </div>
  );
}

export default EditTeacher